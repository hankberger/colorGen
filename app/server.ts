import express from 'express';
import path from 'path';
import OpenAI from "openai";

const openai = new OpenAI();

const app = express();
const port = 3000; // You can choose any port that is free on your system

// Serve static files from 'public' directory
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/makeImage', async (req, res) => {
    const query = req.query.query as string;
    console.log(`Generating ${query}...`)
    try {
        // Example: Fetch data from JSONPlaceholder or another API
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `A beautiful coloring book page design of ${query}`,
            n: 1,
            size: "1024x1024",
          });

        console.log(response.data);

        const data = await response.data;
        console.log(`Done!`)
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
