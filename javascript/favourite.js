// IIFE javascript design pattern used
(function() {

    // superhero div id
    var fav_heros_list = document.getElementById('fav-superhero');


    //  viewing hero page
    function viewHero(div1) {

        let element1 = div1.getElementsByTagName('img')[0];
        element1.addEventListener('click', (e) => {
            let way1=`${window.location.pathname} + /../../html/hero.html#id=${e.target.id}`;
            let a = document.createElement('a');
            a.target = '_blank';
            a.href = way1;
            a.click();
        });
    }


    // function to check favourite heros in the local storage
    function favouriteHeros() {

        let heros = [];
        if(localStorage.getItem('FavouriteHeros') !== null) {
            heros = JSON.parse(localStorage.getItem('FavouriteHeros'));
        }

        heros.sort(function(a,b) {
            return a - b;
        });

        return heros;
    }


    //remove the id from FavouriteHeros section of local storage
    function removefromFav(e) {
        
        let id = e.target.parentElement.id;
        let herosFav = favouriteHeros();
        
        // filter the ids from the array if that id is not equal to the targeted id
        let updatedFavs = herosFav.filter(function (val) {
            return val != id;
        })

        // removing from dom
        localStorage.setItem('FavouriteHeros', JSON.stringify(updatedFavs));
        let heros = document.getElementsByClassName('childSuperHero');
        for (let i = 0; i < herosFav.length; i++) {
            if (heros[i].id == id) {
                fav_heros_list.removeChild(heros[i]);
                break;
            }
        }
    }


    // function to display data of the superhero
    function display(data) {

        let div1 = document.createElement('div');

        div1.setAttribute('id', `${data.id}`);

        div1.className = 'childSuperHero';

        div1.innerHTML = `<img src="${data.image.url}" id=${data.id}>
                        <div>
                            <h3>${data.name}</h3>
                            <h3>Intelligence : ${data.powerstats.intelligence}</h3>
                        </div>`;

        let removeHero = document.createElement('button');
        removeHero.className = 'remove-fav';
        let textNode = document.createTextNode('Remove');
        removeHero.appendChild(textNode);
        removeHero.addEventListener('click', removefromFav);

        div1.appendChild(removeHero);

        fav_heros_list.appendChild(div1);

        viewHero(div1,data);
        return;
    }


    // function to extract data from the url using fetch api
    function extract() {

        let favHerosIds = favouriteHeros();
        console.log(favHerosIds);

        for(let i=0; i<favHerosIds.length; i++) {
            fetch('https://www.superheroapi.com/api.php/1358348604650444/' + favHerosIds[i])
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                display(data);
                return data;
            })
        }    
    }

    extract();

})();

