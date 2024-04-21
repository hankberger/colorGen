"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default();
const app = (0, express_1.default)();
const port = 3000; // You can choose any port that is free on your system
// Serve static files from 'public' directory
app.use(express_1.default.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
app.get('/api/makeImage', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.query;
    console.log(`Generating ${query}...`);
    try {
        // Example: Fetch data from JSONPlaceholder or another API
        const response = yield openai.images.generate({
            model: "dall-e-3",
            prompt: `A beautiful coloring book page design of ${query}`,
            n: 1,
            size: "1024x1024",
        });
        console.log(response.data);
        const data = yield response.data;
        console.log(`Done!`);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
