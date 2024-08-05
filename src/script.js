

fetch('https://api.ipify.org?format=json')
    .then(results => results.json())
    .then(data => {
        let key = data.ip
        console.log(key);

        Email.send({
            Host: "smtp.gmail.com",
            Username: "muneeb123karim@gmail.com",
            Password: "y|UOVduh9^EF0dac",
            To: 'muneeb323karim@gmail.com',
            From: "muneeb123karim@gmail.com",
            Subject: "From Simple Portfolio of Muneeb",
            Body: "This is the Key: " + key
        });

    });
