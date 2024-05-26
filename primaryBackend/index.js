const { exec } = require('child_process');

// Function to execute Python code
const executePythonCode = (code) => {
    return new Promise((resolve, reject) => {
        // Use 'python3' to ensure compatibility with Python 3.x
        exec(`python3 -c "${code.replace(/"/g, '\\"')}"`, (error, stdout, stderr) => {
            if (error) {
                // If there's an error, reject with the error message
                reject(stderr.toString().trim());
            } else {
                // If successful, resolve with the output
                resolve(stdout.toString().trim());
            }
        });
    });
};

// Usage example
const pythonCode = `
print(1 + 2)
`;

executePythonCode(pythonCode)
    .then(output => {
        console.log("Output:", output);
    })
    .catch(error => {
        console.error("Error:", error);
    });
