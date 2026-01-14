

async function get_work_directory() {
    try {
        window.folderHandle = await window.showDirectoryPicker();

    } catch (err) {
        console.error("Error al seleccionar la carpeta de trabajo:", err);
    }
}

async function login_button_activate(){



    const login_button = document.getElementById("sig-in-button")

    if (window.folderHandle){
        login_button.classList.add("active-login-button")
    }

    
}


function main(){

    const working_folder = document.getElementById("select-work-folder")
    working_folder.addEventListener("click", async ()=>{
        working_folder.disabled = true;
        console.log("Se ha oprimido el boton de seleccionar la carpeta");
        await get_work_directory();

        login_button_activate();

        working_folder.disabled = false;
    })
    
}

main()