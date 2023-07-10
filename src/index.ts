import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
const httpStatusCodes: { [key: string]: string } = require('./httpCodes.json');


const app = express();
const PORT = parseInt(process.env.PORT || '3000');

app.set('trust proxy', true);
app.use(cors());

app.use(morgan('dev'));
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Requesting IP: ${req.ip}`);
    console.log(`User Agent: ${req.headers['user-agent']}`);
    next();
});

// Function to determine the HTTP status type
function getStatusType(statusCode: number): string {
    if (statusCode >= 100 && statusCode < 200) return "Informational response";
    if (statusCode >= 200 && statusCode < 300) return "Success";
    if (statusCode >= 300 && statusCode < 400) return "Redirection";
    if (statusCode >= 400 && statusCode < 500) return "Client errors";
    if (statusCode >= 500 && statusCode < 600) return "Server errors";
    return "Unknown status type";
}

// Default route
app.get('/', (req: Request, res: Response) => {
    res.send(`
    <h1>Welcome to Proxy Tester</h1>
    <p>To use this service, make a request to /<i>status-code</i>.</p>
    <p>The service will respond with the corresponding HTTP status code, the type of this status code, your IP and the headers you sent.</p>
    <p>For example, <a href="/200">click here</a> to simulate a response with a 200 status code.</p>
  `);
});

// Status routes
app.get('/:statusCode', (req: Request, res: Response) => {
    const statusCode = parseInt(req.params.statusCode, 10);

    // Check if statusCode is a valid HTTP status code
    if (statusCode >= 100 && statusCode < 600) {
        const statusMessage = httpStatusCodes[statusCode] || "Unknown Status Code"
        const clientHeaderInformation = {
            "Status Type": getStatusType(statusCode),
            "Status Code Definition": statusMessage,
            "Client IP": req.ip,
            "Headers": req.headers
        };

        // If the status code is in the 300 range, redirect to '/redirected/:statusCode'
        if (statusCode >= 300 && statusCode < 400) {
            const headersQueryString = encodeURIComponent(JSON.stringify(req.headers));
            res.redirect(`/redirected/${statusCode}?headers=${headersQueryString}`);
        } else {
            res.status(statusCode).json(clientHeaderInformation);
        }
    } else {
        res.status(400).json({ error: "Invalid status code" });
    }
});

// Redirected Status routes
app.get('/redirected/:statusCode', (req: Request, res: Response) => {
    const statusCode = parseInt(req.params.statusCode, 10);
    const statusMessage = httpStatusCodes[statusCode] || "Unknown Status Code"

    // Check if statusCode is a valid HTTP status code
    if (statusCode >= 300 && statusCode < 400) {
        const headers = JSON.parse(decodeURIComponent(req.query.headers as string));
        const clientHeaderInformation = {
            "Status Type": getStatusType(statusCode),
            "Status Code Definition": statusMessage,
            "Client IP": req.ip,
            "Headers": headers
        };

        // Always return 200 after a redirect
        res.status(200).json(clientHeaderInformation);
    } else {
        res.status(400).json({ error: "Invalid status code for redirect" });
    }
});

app.listen(PORT, '::', () => console.log(`Server is running on http://[::]:${PORT}`));