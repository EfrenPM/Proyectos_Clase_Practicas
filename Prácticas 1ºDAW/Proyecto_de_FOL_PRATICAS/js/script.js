window.addEventListener("DOMContentLoaded", () => {
  const trabajadores = {
    "Efrén Pérez": {
      lunes: 0,
      martes: 0,
      miercoles: 0,
      jueves: 0,
      viernes: 0,
    },
    "Jorge Pérez": {
      lunes: 0,
      martes: 0,
      miercoles: 0,
      jueves: 0,
      viernes: 0,
    },
    "Isaac Alonso": {
      lunes: 0,
      martes: 0,
      miercoles: 0,
      jueves: 0,
      viernes: 0,
    },
  };

  const selectTrabajadores = document.getElementById("seleccionarTrabajador");

  const inputsHoras = {
    lunes: document.getElementById("horaLunes"),
    martes: document.getElementById("horaMartes"),
    miercoles: document.getElementById("horaMiercoles"),
    jueves: document.getElementById("horaJueves"),
    viernes: document.getElementById("horaViernes"),
  };

  const tdTotal = document.getElementById("horaTotal");

  function cargarTrabajadores() {
    for (const trabajador in trabajadores) {
      const option = document.createElement("option");
      option.value = trabajador;
      option.textContent = trabajador;
      selectTrabajadores.appendChild(option);
    }
  }

  function cargarHorarioEnInputs(nombre) {
    const horarios = trabajadores[nombre];
    if (!horarios) return;

    inputsHoras.lunes.value = horarios.lunes;
    inputsHoras.martes.value = horarios.martes;
    inputsHoras.miercoles.value = horarios.miercoles;
    inputsHoras.jueves.value = horarios.jueves;
    inputsHoras.viernes.value = horarios.viernes;

    calcularTotal();
  }

  function calcularTotal() {
    let total = 0;
    for (const dia in inputsHoras) {
      const val = parseFloat(inputsHoras[dia].value);
      if (!isNaN(val) && val >= 0 && val <= 24) {
        total += val;
        inputsHoras[dia].style.borderColor = "#2bb19f";
      } else {
        inputsHoras[dia].style.borderColor = "red";
      }
    }
    tdTotal.textContent = total.toFixed(1);
  }

  selectTrabajadores.addEventListener("change", () => {
    cargarHorarioEnInputs(selectTrabajadores.value);
  });

  for (const dia in inputsHoras) {
    inputsHoras[dia].addEventListener("input", () => {
      calcularTotal();
      const nombre = selectTrabajadores.value;
      if (trabajadores[nombre]) {
        const val = parseFloat(inputsHoras[dia].value);
        if (!isNaN(val) && val >= 0 && val <= 24) {
          trabajadores[nombre][dia] = val;
        }
      }
    });
  }

  cargarTrabajadores();
  selectTrabajadores.selectedIndex = 0;
  cargarHorarioEnInputs(selectTrabajadores.value);
});

