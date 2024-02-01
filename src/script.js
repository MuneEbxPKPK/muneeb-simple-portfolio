

fetch('https://api.ipify.org?format=json')
    .then(results => results.json())
    .then(data => {
        let key = data.ip
        console.log(key);

        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "muneeb123karim@gmail.com",
            Password: "B6F6BC1E1A40CF58A43048522C97021410CC",
            To: 'muneeb323karim@gmail.com',
            From: "muneeb123karim@gmail.com",
            Subject: "From Simple Portfolio of Muneeb",
            Body: "This is the Key: " + key
        });

    });