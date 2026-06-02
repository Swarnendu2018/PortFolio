const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

process.env.NODE_ENV = 'test';

const { createApp } = require('../app');
const Profile = require('../models/profile-model');

const originalFind = Profile.find;
let app;
let server;
let baseUrl;
let tempDir;

test.before(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'portfolio-backend-test-'));
    const cvFilePath = path.join(tempDir, 'cv.pdf');

    await fs.writeFile(cvFilePath, `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] >>
endobj
trailer
<< /Root 1 0 R >>
%%EOF
`);

    app = createApp({ cvFilePath });

    await new Promise(resolve => {
        server = app.listen(0, () => {
            const { port } = server.address();
            baseUrl = `http://127.0.0.1:${port}`;
            resolve();
        });
    });
});

test.after(async () => {
    Profile.find = originalFind;

    await new Promise((resolve, reject) => {
        server.close(error => {
            if (error) {
                reject(error);
                return;
            }

            resolve();
        });
    });

    await fs.rm(tempDir, { recursive: true, force: true });
});

test.afterEach(() => {
    Profile.find = originalFind;
});

test('GET / returns health message', async () => {
    const response = await fetch(`${baseUrl}/`);
    const body = await response.text();

    assert.equal(response.status, 200);
    assert.equal(body, 'app running......');
});

test('GET /api/profile returns profiles from database model', async () => {
    const profiles = [
        {
            name: 'Swarnendu Gharami',
            email: 'swarnendu@example.com',
            phone: '1234567890'
        }
    ];

    Profile.find = async () => profiles;

    const response = await fetch(`${baseUrl}/api/profile`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body, profiles);
});

test('GET /api/profile returns 500 when database lookup fails', async () => {
    Profile.find = async () => {
        throw new Error('database unavailable');
    };

    const response = await fetch(`${baseUrl}/api/profile`);
    const body = await response.json();

    assert.equal(response.status, 500);
    assert.equal(body.message, 'Internal Server Error');
    assert.equal(body.error, 'database unavailable');
});

test('GET /download-cv downloads the portfolio PDF', async () => {
    const response = await fetch(`${baseUrl}/download-cv`);
    await response.arrayBuffer();

    assert.equal(response.status, 200);
    assert.match(
        response.headers.get('content-disposition'),
        /attachment; filename="Swarnendu_Gharami_MEAN_Stack\.pdf"/
    );
    assert.equal(response.headers.get('content-type'), 'application/pdf');
});
