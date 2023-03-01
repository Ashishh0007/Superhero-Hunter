// IIFE javascript design pattern used
(function() {
    
    // get elements id from index.html page
    var superheroname = document.getElementById("superhero-name");
    var addingContent = document.getElementById("adding-list");


    //  function to view the superhero page by clicking superhero name or image
    function ViewHero(li) {

        let element1 = li.getElementsByTagName('h1')[0];
        element1.addEventListener('click', (e) => {
            let way1=`${window.location.pathname} + /../../html/hero.html#id=${e.target.id}`;
            window.open(way1);
        });

        let element2 = li.getElementsByTagName('img')[0];
        element2.addEventListener('click', (e) => {
            let way2=`${window.location.pathname} + /../../html/hero.html#id=${e.target.id}`;
            window.open(way2);
        });
    }


    // function to display the fetched superheros in the list
    function display(data) {

        let li = document.createElement('li');

        li.className = 'list-item';

        li.setAttribute('id', data.id);

        li.innerHTML = `<h1 id=${data.id}>${data.name}</h1>
                        <img src="${data.image.url}" id=${data.id}>`;

        let favheart = document.createElement('i');

        favheart.className = "fa fa-heart";
        
        favheart.setAttribute('id', data.id);

        let favCheck = fvrtHeros();

        if(favCheck.includes(data.id)) {
            favheart.style.color = "red";
        }

        li.append(favheart);

        favheart.addEventListener('click', (e) => {
            let id = e.target.id;
            let changeColor = e.target;
            
            if(!favCheck.includes(id)) {
                changeColor.style.color = "red";
                favCheck.push(id);
            }
            else {
                changeColor.style.color = "darkcyan";
                let index = favCheck.indexOf(id);
                favCheck.splice(index, 1);
            }

            localStorage.setItem('FavouriteHeros', JSON.stringify(favCheck));
        });

        li.append(favheart);
        addingContent.append(li);
        ViewHero(li,data);
        return;
    }


    // function to fetch the favourite superheros ids from the local-storage 
    function fvrtHeros() {

        let heros;
        if (localStorage.getItem('FavouriteHeros') === null) {
            heros = [];
            console.log("No HERO ", heros);
        }
        else {
            heros = JSON.parse(localStorage.getItem('FavouriteHeros'));
            console.log("HERO",heros);
        }

        return heros;
    }


    // iterating over each element in a loop
    function ExtractNames(data, searchText)  {
        
        let local_storage = fvrtHeros();

        console.log("searchText",searchText);

        for(let i=0; i<data.results.length; i++) {
            if(data.results[i].name.slice(0, searchText.length).toUpperCase() == searchText.toUpperCase()) {
                display(data.results[i], searchText, local_storage);
            }
        }
        return;
    }


    //  function to search the heros by the name in the searchbar through fetch api call
    function searchHero(searchText) {

        if(searchText.length > 0) {

            addingContent.className = 'add-listClass';

            console.log('https://www.superheroapi.com/api.php/1358348604650444/search/' + searchText);

            fetch('https://www.superheroapi.com/api.php/1358348604650444/search/'+searchText)    
            .then(response => {
                return response.json();
            })
            .then(data => {

                if (data.response === 'success') {
                    addingContent.innerHTML = "";
                    ExtractNames(data, searchText);
                }
                return data;
            })
        }
        else {   // no text is present
            addingContent.innerHTML = "";
            addingContent.classList.remove('add-listClass');
        }

        addingContent.innerHTML = "";
        return;
    }


    // function for searchbar
    superheroname.addEventListener('keyup', (e) => {
        console.log(e.target.value,e.key);
        searchHero(e.target.value,e.key);
    });


    // intro functionality
    $(function() {
        setTimeout(function() {
            $("#intro").fadeOut(1500);
        }, 8000);

    })

})();