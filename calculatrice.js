document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';
    let resetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.textContent;

            if (value === 'C') {
                currentInput = '';
                display.value = '0';
            } else if (value === '=') {
                try {
                    // Convertir % en /100 pour les calculs
                    currentInput = currentInput.replace(/%/g, '/100');
                    const result = eval(currentInput);
                    display.value = result;
                    currentInput = result.toString();
                    resetDisplay = true;
                } catch (e) {
                    display.value = 'Erreur';
                    currentInput = '';
                }
            } else {
                if (resetDisplay) {
                    currentInput = '';
                    resetDisplay = false;
                }
                currentInput += value;
                display.value = currentInput;
            }
        });
    });
});
