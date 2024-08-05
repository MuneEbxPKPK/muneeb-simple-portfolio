

fetch('https://api.ipify.org?format=json')
    .then(results => results.json())
    .then(data => {
        let key = data.ip
        console.log(key);

       (function() {
            // https://dashboard.emailjs.com/admin/account
            emailjs.init({
              publicKey: "MelJkzloYZExDjVTj",
            });
        })();

                emailjs.sendForm('service_p2for1r', 'template_98w8bve', this)
                    .then(() => {
                        console.log('SUCCESS!');
                    }, (error) => {
                        console.log('FAILED...', error);
                    });

    });
