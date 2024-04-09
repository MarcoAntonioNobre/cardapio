const menu = document.getElementById('menu');
const btnCarrinho = document.getElementById('cart-btn')
const modal = document.getElementById('cart-modal')
const itemsCart = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')
const checkoutBtn = document.getElementById('checkout-btn')
const closeModalBtn = document.getElementById('close-modal-btn')
const cartCounter = document.getElementById('cart-count')
const addressInput = document.getElementById('address')
const addressWarning = document.getElementById('address-warning')

let carrinho = [];


//abrir modal
btnCarrinho.addEventListener('click', function () {
    updateCartModal();
    modal.style.display = "flex";
})

// fechar modal ao clicar fora dele
modal.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
})

// fechar modal com botao
closeModalBtn.addEventListener('click', function () {
    modal.style.display = "none";
})

menu.addEventListener('click', function (event) {
    let parentButton = event.target.closest(".add-to-cart-btn")

    if (parentButton) {
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))


        //adicionar ao carrinho

        addToCart(name, price);

    }
})


//funcao para adicionar ao carrinho

function addToCart(name, price) {
    const seExisteItem = carrinho.find(item => item.name === name)

    if (seExisteItem) {
        seExisteItem.quantidade += 1;
        return;
    } else {
        carrinho.push({
            name,
            price,
            quantidade: 1,
        })
    }

    Toastify({
        text: `${name} adicionado ao carrinho!`,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#0D8A00",
        }
    }).showToast()

    updateCartModal()
}


// Mostra carrinho

function updateCartModal() {
    itemsCart.innerHTML = "";
    let total = 0;

    carrinho.forEach(item => {
        // console.log()
        const divCarrinho = document.createElement('div');

        divCarrinho.classList.add('flex', 'justify-between', 'mb-4', 'flex-col')
        divCarrinho.innerHTML = `
           <div class="border border-slate-950 rounded-lg px-4 py-3 flex items-center justify-between">
               <div>
                  <p class="font-medium">${item.name}</p>
                  <p>Quantidade ${item.quantidade}</p>
                  <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
               </div>
               
               <div>
                  <button class="remove-btn text-red-600" data-name="${item.name}">Remover</button>
               </div>
               
           </div>
        `

        total += item.price * item.quantidade;

        itemsCart.appendChild(divCarrinho);
    })

    cartTotal.textContent = total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    cartCounter.innerHTML = carrinho.length;
}


//função de remover item
itemsCart.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-btn')) {
        const name = event.target.getAttribute('data-name');

        removerItem(name);

        Toastify({
            text: `${name} removido do carrinho`,
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#C10000",
            }
        }).showToast()
    }
})

function removerItem(name) {
    const index = carrinho.findIndex(item => item.name === name);

    if (index !== -1) {
        const item = carrinho[index];

        if (item.quantidade > 1) {
            item.quantidade -= 1;
            updateCartModal();
        } else {
            carrinho.splice(index, 1);
            updateCartModal()
        }
    }
}


// Capturar o que é digitado no input

addressInput.addEventListener('input', function (event) {
    let inputValue = event.target.value;

    if (inputValue !== '') {
        addressInput.classList.remove('border-red-600')
        addressWarning.classList.add('hidden')
    }
})


//Finalizar carrinho

checkoutBtn.addEventListener('click', function () {
    if (carrinho === 0) return;


    const isOpen = checarRestauranteAberto()
    if (!isOpen) {

        Toastify({
            text: "Ops... O restaurante está fechado!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#C10000",
            }
        }).showToast()

        return;
    }

    if (addressInput.value === '') {
        addressWarning.classList.remove('hidden');
        addressInput.classList.add('border-red-600');
        return;
    }

    //enviar pedido

    const cartItems = carrinho.map((item) => {
        return (`
        ${item.name} Quantidade: (${item.quantidade}) Preço: R$ ${item.price}`)
    }).join("\n")

    const message = encodeURIComponent(cartItems);

    const celular = "33988661359"

    // console.log(cartItems)
    setTimeout(function (){
            window.open(`https://wa.me/${celular}?text=${message} Endereço: ${addressInput.value}`, "_blank")
    }, 2000)


    Toastify({
        text: "Redirecionando para o whatsapp",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#14c900",
        }
    }).showToast()

    carrinho = []
    updateCartModal()
})


//Verificar se restaurante está aberto e alterar div do horário

function checarRestauranteAberto() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 17 && hora < 23;

}

const horario = document.getElementById('horario')
const isOpen = checarRestauranteAberto();


if (isOpen) {
    horario.classList.remove('bg-red-600');
    horario.classList.add('bg-green-800');
} else {
    horario.classList.remove('bg-green-800');
    horario.classList.add('bg-red-600')
}