
(function() {
    const { ipcRenderer } = require('electron');
    const right = document.querySelector('#right');
    const wrong = document.querySelector('#wrong');

    ipcRenderer.on('hellow', (e, src) => {
        alert(`土匪出现, 他说:${src}`);
    });

    ipcRenderer.on('check', (e, src) => {
        if (src.pass) {
            right.className = 'right';
            wrong.className = 'wrong hide';
        } else {
            right.className = 'right hide';
            wrong.className = 'wrong';
        }
    });
    ipcRenderer.send('foo', 'bar');

    const input = document.querySelector('input');
    const submitBtn = document.querySelector('#btn');
    submitBtn.addEventListener('click', () => {
        ipcRenderer.send('password', input.value);
    });

    const resetBtn = document.querySelector('#reset');
    resetBtn.addEventListener('click', () => {
        input.value = '';
        right.className = 'right hide';
        wrong.className = 'wrong hide';
    });

}());
