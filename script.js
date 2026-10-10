// 1. CALCULADORA DE EDAD
document.getElementById("calcularEdad").addEventListener("click", function () {
    const dia = Number(document.getElementById("dia").value);
    const mes = Number(document.getElementById("mes").value);
    const anio = Number(document.getElementById("anio").value);
    const resultado = document.getElementById("resultadoEdad");
    const hoy = new Date();
    const nacimiento = new Date(anio, mes - 1, dia);

    if (!dia || !mes || !anio ||
        nacimiento.getFullYear() !== anio ||
        nacimiento.getMonth() !== mes - 1 ||
        nacimiento.getDate() !== dia ||
        nacimiento > hoy) {
        resultado.textContent = "Escribe una fecha válida.";
        return;
    }

    let años = hoy.getFullYear() - anio;
    let meses = hoy.getMonth() - (mes - 1);

    if (hoy.getDate() < dia) {
        meses--;
    }

    if (meses < 0) {
        años--;
        meses += 12;
    }

    resultado.textContent = "Tu edad es: " + años + " años y " + meses + " meses.";
});


// 2. CONVERTIDOR DE TEMPERATURA
const valorTemperatura = document.getElementById("valorTemperatura");
const origen = document.getElementById("origen");
const destino = document.getElementById("destino");
const botonConvertir = document.getElementById("convertir");
const resultadoTemperatura = document.getElementById("resultadoTemperatura");

function revisarCampos() {
    const tieneValor = valorTemperatura.value.trim() !== "";
    const tieneOrigen = origen.value !== "";
    const tieneDestino = destino.value !== "";
    botonConvertir.disabled = !(tieneValor && tieneOrigen && tieneDestino);
}

valorTemperatura.addEventListener("input", revisarCampos);
origen.addEventListener("change", revisarCampos);
destino.addEventListener("change", revisarCampos);

botonConvertir.addEventListener("click", function () {
    const numero = Number(valorTemperatura.value);
    let celsius;

    if (origen.value === "C") celsius = numero;
    if (origen.value === "F") celsius = (numero - 32) * 5 / 9;
    if (origen.value === "K") celsius = numero - 273.15;

    if (celsius < -273.15) {
        resultadoTemperatura.textContent = "La temperatura no puede ser menor que el cero absoluto.";
        return;
    }

    let resultado;

    if (destino.value === "C") resultado = celsius;
    if (destino.value === "F") resultado = celsius * 9 / 5 + 32;
    if (destino.value === "K") resultado = celsius + 273.15;

    resultadoTemperatura.textContent =
        "Resultado: " + resultado.toFixed(2) + " °" +
        (destino.value === "K" ? "K" : destino.value);
});


// 3. LISTA DE TAREAS
let tareas = [];

const descripcionTarea = document.getElementById("descripcionTarea");
const listaTareas = document.getElementById("listaTareas");
const mensajeTarea = document.getElementById("mensajeTarea");

function mostrarTareas() {
    listaTareas.innerHTML = "";

    // Las pendientes aparecen primero y las completadas al final.
    tareas.sort((a, b) => a.completada - b.completada);

    tareas.forEach(function (tarea) {
        const elemento = document.createElement("li");
        const casilla = document.createElement("input");
        const texto = document.createElement("span");
        const botonEliminar = document.createElement("button");

        casilla.type = "checkbox";
        casilla.checked = tarea.completada;

        texto.textContent = tarea.descripcion;
        if (tarea.completada) {
            texto.classList.add("hecha");
        }

        casilla.addEventListener("change", function () {
            tarea.completada = casilla.checked;
            mostrarTareas();
        });

        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", function () {
            tareas = tareas.filter(item => item !== tarea);
            mostrarTareas();
        });

        elemento.append(casilla, texto, botonEliminar);
        listaTareas.appendChild(elemento);
    });
}

document.getElementById("agregarTarea").addEventListener("click", function () {
    const descripcion = descripcionTarea.value.trim();

    if (descripcion === "") {
        mensajeTarea.textContent = "Escribe una tarea primero.";
        return;
    }

    tareas.push({
        descripcion: descripcion,
        completada: false
    });

    descripcionTarea.value = "";
    mensajeTarea.textContent = "";
    mostrarTareas();
});

descripcionTarea.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        document.getElementById("agregarTarea").click();
    }
});
