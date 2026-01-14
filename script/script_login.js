
async function login_page_disabled(){
    const login_page = document.getElementById("login-page");
    login_page.style.display = "none";
} 

async function menu_page_enabled(){
    const menu_page = document.getElementById("menu-page");
    menu_page.style.display = "block";
}

async function get_work_directory() {
    try {
        window.folderHandle = await window.showDirectoryPicker();

    } catch (err) {
        console.error("Error al seleccionar la carpeta de trabajo:", err);
    }
}

async function login_button_activate(){



    const login_form = document.getElementById("login-form")
    const login_button = document.getElementById("sig-in-button")

    login_form.addEventListener("submit", async (event)=>{
        login_button.disabled = true;

        try{
            event.preventDefault();
            console.log("Se ha oprimido el boton de login");
        }
        catch(err){
            console.error("Error al oprimir el boton de login:", err);
        }
        finally{

            login_button.disabled = false;
            console.log("Login button habilitado nuevamente");

            await login_page_disabled();
            await menu_page_enabled();

        }

    })

    if (window.folderHandle){
         login_button.classList.add("active-login-button")
    }



}


function main(){

    const working_folder_button = document.getElementById("select-work-folder")



    working_folder_button.addEventListener("click", async ()=>{
        working_folder_button.disabled = true;
        console.log("Se ha oprimido el boton de seleccionar la carpeta");
        await get_work_directory();

        await login_button_activate(); // Activar el boton de login si se selecciono una carpeta

        if(window.folderHandle){
            console.log("Se ha seleccionado la carpeta de trabajo");
        }

        working_folder_button.disabled = false;
    })

}

main()