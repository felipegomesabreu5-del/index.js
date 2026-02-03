<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>DASHBOARD CLOUD | PEAKY BLINDERS</title>
    <style>
        /* Estilo simplificado para o exemplo, mantenha o seu CSS anterior aqui */
        body { background: #000; color: #fff; font-family: sans-serif; padding: 20px; }
        .notificacao { 
            position: fixed; top: 20px; right: 20px; padding: 20px; 
            border-radius: 5px; display: none; animation: slideIn 0.5s forwards;
        }
        .aceito { background: #00ff88; color: #000; }
        .recusado { background: #ff4444; color: #fff; }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
    </style>
</head>
<body>

    <div id="status-alerta" class="notificacao"></div>

    <h1>SISTEMA PEAKY BLINDERS (NUVEM)</h1>
    
    <div id="area-membro">
        <button onclick="enviarTeste()">ENVIAR PEDIDO DE TESTE</button>
    </div>

    <script>
        // COLE O LINK DO SEU RENDER AQUI ABAIXO
        const URL_NUVEM = "COLE_AQUI_O_LINK_DO_RENDER/api";

        // Função para mandar pedido
        async function enviarTeste() {
            const novoPedido = {
                id: Date.now(),
                membro: "Felipe",
                valor: 10,
                status: "PENDENTE"
            };

            await fetch(`${URL_NUVEM}/pedidos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novoPedido)
            });
            alert("Pedido enviado para a nuvem!");
        }

        // FUNÇÃO QUE CHECA AUTOMATICAMENTE SE FOI ACEITO OU RECUSADO
        async function checkStatus() {
            try {
                const response = await fetch(`${URL_NUVEM}/dados`);
                const dados = await response.json();
                
                // Procura um pedido desse membro que não seja mais "PENDENTE"
                const meuPedido = dados.pedidos.find(p => p.membro === "Felipe" && p.status !== "PENDENTE");

                if (meuPedido) {
                    const alerta = document.getElementById('status-alerta');
                    alerta.style.display = 'block';
                    alerta.className = `notificacao ${meuPedido.status.toLowerCase()}`;
                    alerta.innerText = `SEU PEDIDO FOI: ${meuPedido.status}!`;
                }
            } catch (e) { console.log("Aguardando conexão..."); }
        }

        // Verifica a cada 5 segundos
        setInterval(checkStatus, 5000);
    </script>
</body>
</html>
