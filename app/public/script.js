document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const userInput = document.getElementById('inputField').value;
    fetch(`/api/data?query=${encodeURIComponent(userInput)}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('responseData').textContent = JSON.stringify(data);
        })
        .catch(error => {
            document.getElementById('responseData').textContent = 'Error: ' + error;
        });
});
