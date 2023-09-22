        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const larguraFrame = 15; // Ajuste de acordo com a largura de cada frame
        const alturaFrame = 100;
        let personagemFrames = [];
        let frameAtual = 0;
        let animacaoPausada = false;
        let FPS = 8;

        const personagemImagem = new Image();
        personagemImagem.src = '/assets/DinoMygol.png';

        personagemImagem.onload = () => {
            canvas.width = larguraFrame;
            canvas.height = alturaFrame;
            for (let i = 0; i < personagemImagem.width / larguraFrame; i++) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(personagemImagem, i * larguraFrame, 0, larguraFrame, alturaFrame, 0, 0, larguraFrame, alturaFrame);
                const frame = new Image();
                frame.src = canvas.toDataURL();
                personagemFrames.push(frame);
            }
            iniciarAnimacao();
        };

        function animatePersonagem() {
            if (animacaoPausada) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(personagemFrames[frameAtual], 0, 0);
            frameAtual = (frameAtual + 1) % personagemFrames.length;
            setTimeout(animatePersonagem, 1000 / FPS);
        }

        function iniciarAnimacao() {
            animatePersonagem();
        }

        function pausarAnimacao() {
            animacaoPausada = true;
        }

        function retomarAnimacao() {
            animacaoPausada = false;
            animatePersonagem();
        }