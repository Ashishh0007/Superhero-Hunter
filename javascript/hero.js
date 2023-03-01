// IIFE javascript design pattern used
(function() {
    
    // ids for superhoro's image, personal, biography and power sections details
    var personalDetails=document.getElementById('personalDetail');
    var biography=document.getElementById('biography');
    var powerstats=document.getElementById('powerstats');
    var imageSuper = document.getElementById("imageSuper");


    // function to show the image and to show the biography and powerstar details
    function printDetails(data) {

        imageSuper.src = data.image.url;

        ul1 = document.createElement('ul');
        ul1 = document.createElement('ul');
        ul1.innerHTML = `
                            <h1>${data.name}</h1>
                            <p><strong>Gender :&nbsp;</strong>${data.appearance.gender}</p>
                            <p><strong>Race :&nbsp;</strong>${data["appearance"]["race"]}</p>
                            <p><strong>Hair-Color :&nbsp;</strong>${data['appearance']['hair-color']}</p>
                            <p><strong>Height :&nbsp;</strong>${data.appearance.height}</p>
                            <p><strong>Eye-Color :&nbsp;</strong>${data["appearance"]["eye-color"]}</p>
                            <p><strong>Weight :&nbsp;</strong>${data.appearance.weight}</p>
                        `;
        personalDetails.appendChild(ul1);

        ul2 = document.createElement('ul');
        ul2.innerHTML = `
                            <p><strong>Aliases : </strong>[${data["biography"]["aliases"].slice(0,10)}]</p>
                            <p><strong>Alignment : </strong>${data.biography.alignment}</p>
                            <p><strong>Alter-Egos : </strong>${data["biography"]["alter-egos"]}</p>
                            <p><strong>First-Appearance : </strong>${data["biography"]["first-appearance"].slice(0,10)}</p>
                            <p><strong>Full-Name : </strong>${data["biography"]["full-name"]}</p>
                            <p><strong>Place-Of-Birth: </strong>${data["biography"]["place-of-birth"]}</p>
                            <p><strong>Publisher: </strong>${data["biography"]["publisher"]}</p>
                        `;
        biography.appendChild(ul2);

        ul3 = document.createElement('ul');
        ul3.innerHTML = `
                            <p><strong>Combat : &emsp;&emsp;</strong>${data.powerstats.combat}</p>
                            <p><strong>Durability : &emsp;</strong>${data.powerstats.durability}</p>
                            <p><strong>Intelligence : &emsp;</strong>${data["powerstats"]["intelligence"]}</p>
                            <p><strong>Power : &emsp;&emsp;&emsp;</strong>${data["powerstats"]["power"]}</p>
                            <p><strong>Speed : &emsp;&emsp;&emsp;</strong>${data["powerstats"]["speed"]}</p>
                            <p><strong>Strength: &emsp;&emsp;</strong>${data["powerstats"]["strength"]}</p>
                            <p><strong>Strength: &emsp;</strong>${data["work"]["occupation"]}</p>
                        `;
        powerstats.appendChild(ul3);
    }


    // function to retrive the data of the superhero from id using fetch api
    function retrive(heroId) {

        fetch('https://www.superheroapi.com/api.php/1358348604650444/'+heroId)
        .then(response => {
            return response.json();
        })
        .then(data => {
            printDetails(data);
            return;
        })
    }


    // on load window it will run
    window.onload = () => {

        let currURL = window.location.href;
        let heroId = currURL.substring(currURL.lastIndexOf('=') + 1);
        retrive(heroId);
    }

})();