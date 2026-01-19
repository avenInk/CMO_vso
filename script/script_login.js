let fileName = null; // Se define nombre de variable global para almacenar el operador del monitorista.

function log_out() {
    const login_button = document.getElementById("sig-in-button")
    login_button.classList.remove("active-login-button");
    window.folderHandle = undefined;
    login_page_enabled();
    menu_page_disabled();
    const card_container = document.querySelector(".card-container");
    card_container.innerHTML = ""; // limpiamos el contenedor donde estaran las tarjetas.
    if (document.querySelector(".active_station") != null) {  //validamos que haya un boton activado
        const active_button_station = document.querySelector(".active_station")
        active_button_station.classList.remove("active_station") //eliminamos la visualizacion de activacion
    }

}

async function activate_stations_buttons() {
    const station_list = document.getElementById("station-list");

    station_list.addEventListener("click", (event) => {



        event.target.disabled = true; // Deshabilitar el boton al hacer click




        if (window.name_stations[event.target.id]) {

            //eliminamos los botones activos 
            if (document.querySelector(".active_station") != null) {  //validamos que haya un boton activado
                const active_button_station = document.querySelector(".active_station")
                active_button_station.classList.remove("active_station")
            }


            event.target.classList.add("active_station")
            console.log("Se ha oprimido el boton de la estacion:", event.target.id);
            get_station_cards_by_station(window.name_stations[event.target.id]);
        }

        event.target.disabled = false; // Habilitar el boton nuevamente despues de procesar el click

    })
}

async function login_page_disabled() {
    const login_page = document.getElementById("login-page");
    login_page.style.display = "none";
}

async function menu_page_enabled() {
    const menu_page = document.getElementById("menu-page");
    menu_page.style.display = "block";
    activate_stations_buttons();
}

async function menu_page_disabled() {
    const menu_page = document.getElementById("menu-page");
    menu_page.style.display = "none";
}

async function login_page_enabled() {
    const login_page = document.getElementById("login-page");
    login_page.style.display = "flex";
}


async function get_station_cards_by_station(cards) {

    const card_container = document.querySelector(".card-container");
    card_container.innerHTML = ""; // limpiamos el contenedor donde estaran las tarjetas.

    cards.forEach(store_name => {
        console.log(store_name)


        const card = document.createElement("article")  //creamos un article para cada tarjeta
        card.className = "card"
        card.innerHTML = `
            <header>
                <h3>${store_name}</h3> 
            </header>
            
            <footer>
                <button class="incidencias_button_cards" id="incidencias_actuation_button_cards_name_${store_name}">Incidencia</button> 
            </footer>
            `  //agregamos el nombre de la estacion a la tarjeta
        card_container.appendChild(card)  //agregamos la tarjeta al contenedor de tarjetas

    });

}


async function get_work_directory() {
    try {
        window.folderHandle = await window.showDirectoryPicker();

    } catch (err) {
        console.error("Error al seleccionar la carpeta de trabajo:", err);
    }
}

async function login_button_activate() {



    const login_form = document.getElementById("login-form")
    const login_button = document.getElementById("sig-in-button")

    if (window.folderHandle != undefined) {
        login_button.classList.add("active-login-button")


        login_form.addEventListener("submit", async (event) => {
            login_button.disabled = true;

            const operator_name = document.getElementById("operator").value;
            document.getElementById("operator-id").innerHTML = `Operador ${operator_name.slice(-2)}`


            fileName = `${operator_name}.json` // obtenemos el operador seleccionado del <select>
            console.log(`${fileName}`)


            try {
                event.preventDefault();
                console.log("Se ha oprimido el boton de login");
            }
            catch (err) {
                console.error("Error al oprimir el boton de login:", err);
            }
            finally {

                login_button.disabled = false;
                console.log("Login button habilitado nuevamente");

                await login_page_disabled();
                await menu_page_enabled();

            }
        })

    }

}





function main() {

    const working_folder_button = document.getElementById("select-work-folder")




    working_folder_button.addEventListener("click", async () => {
        working_folder_button.disabled = true;
        console.log("Se ha oprimido el boton de seleccionar la carpeta");
        await get_work_directory();

        await login_button_activate(); // Activar el boton de login si se selecciono una carpeta

        if (window.folderHandle) {
            console.log("Se ha seleccionado la carpeta de trabajo");
        }

        working_folder_button.disabled = false;
    })


    //Se agrega la logica para "salir de la cuenta" o para seleccionar otro operador y carpeta de trabajo.
    const logout_button = document.getElementById("logout_button")
    logout_button.addEventListener("click", () => {
        logout_button.disabled = true;

        try {
            log_out();
            console.log("Se oprime boton de logout")
        }
        finally {
            logout_button.disabled = false;
        }

    })


}


document.getElementById("VSO_TEST").addEventListener("click", () => { login_page_disabled(); menu_page_enabled() })


main()