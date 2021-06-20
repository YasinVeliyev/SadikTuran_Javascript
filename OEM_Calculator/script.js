//Storage Controller
let StorageController = (function(){
    return {
        storeProduct(data){
            localStorage.setItem('products',JSON.stringify(data))
        },
        getProducts(){
            return JSON.parse(localStorage.getItem('products'))||[]
        },
    }
})()

//Product Controller
let ProductController = (function(){
    let Product = function (id, name, price){
        this.id= id
        this.name = name
        this.price = price
    }

    let data = {
        products: StorageController.getProducts(),
        selectedProduct:null,
        totalPrice:0
    }

    return {
        getProducts(){
            return data.products
        },
        getData(){
            return data
        },
        addProduct(name, price){
            UiController.productCard.style.display = 'block'
            let products = data.products
            let id = !products.length ? 0 : products[products.length-1].id + 1
            let newProduct = new Product(id,name,parseFloat(price))
            products.push(newProduct)
            StorageController.storeProduct(products)
            return newProduct
        },
        geTotal(){
            data.totalPrice = data.products.reduce((accumulator, elem) => accumulator + elem.price,0)
            return data.totalPrice
        },
        
        getAndSetProductById(id){
            data.selectedProduct = data.products.filter(prd=>prd.id==id)[0]
            return data.selectedProduct
        },
        updateProduct(name, price){
            data.selectedProduct.name = name
            data.selectedProduct.price = parseFloat(price)
            data.products.forEach(prd=>{
                if(prd.id === data.selectedProduct.id){
                    prd = data.selectedProduct
                }
            })
            StorageController.storeProduct(data.products)
        },

        deleteProductById(id){
            data.products = data.products.filter((prd)=>prd.id!=id)
            StorageController.storeProduct(data.products)
            if(this.geTotal()===0){
                UiController.hideCard()
            }
        }
    }

})()

//UI Controller
let UiController = (function(){
    let table = document.querySelector("#item-list")
    let totalTl = document.querySelector("#total-tl")
    let totalUSD = document.querySelector("#total-usd")
    let productCard = document.querySelector('#productCard')
    let name = document.querySelector('#name')
    let price = document.querySelector('#price')
    let addBtn = document.querySelector(".addBtn")
    let deleteBtn = document.querySelector(".deleteBtn")
    let cancelBtn = document.querySelector(".cancelBtn")
    let saveBtn = document.querySelector(".saveBtn")

    return {
        table,
        productCard,
        inputs:{name,price},
        buttons:{addBtn,deleteBtn,cancelBtn,saveBtn},
        addElement(prd){
           table.innerHTML += ` <tr>
                    <td>${prd.id}</td>
                    <td>${prd.name}</td>
                    <td >${prd.price} $</td>
                    <td>
                        <i class='fas fa-edit'> Edit</i>
                    </td>
                </tr>`
        },

        createProductList(products){
            products.forEach(this.addElement)
        },
        deleteInputValue(){
            this.inputs.name.value = ''
            this.inputs.price.value = ''
        },
        hideCard(){
            productCard.style.display = 'none'
        },

        showTotal(total){
            totalUSD.textContent = total;
            totalTl.textContent = total * 5;
        },
        addProductToForm(selectedProduct){
            name.value = selectedProduct.name
            price.value = selectedProduct.price
        },
        editState(tr){
            Array.from(document.querySelector('tbody').children,elem=>{elem.className=''})
            tr.classList.add('bg-info')
            cancelBtn.style.display='inline'
            saveBtn.style.display='inline'
            deleteBtn.style.display='inline'
            addBtn.style.display='none'
        },
        addState(){
            Array.from(document.querySelector('tbody').children,elem=>elem.className='')
            cancelBtn.style.display='none'
            saveBtn.style.display='none'
            deleteBtn.style.display='none'
            addBtn.style.display='inline'
        },
        updateProduct(){
            let selectedElement = document.querySelector(".bg-info")
            selectedElement.children[1].textContent = ProductController.getData().selectedProduct.name
            selectedElement.children[2].textContent = ProductController.getData().selectedProduct.price + " $"
            this.addState()
            this.showTotal(ProductController.geTotal())
        }
    }
})()

//App Controller
let App = (function(ProdCtrl,UiCtrl,StorageCtrl){
    
    UiCtrl.buttons.addBtn.addEventListener('click', (e)=>{
        e.preventDefault() 
        if(UiCtrl.inputs.name.value!==''&&UiCtrl.inputs.price.value!==""){
            let product = ProdCtrl.addProduct(UiCtrl.inputs.name.value, UiCtrl.inputs.price.value)
            UiCtrl.deleteInputValue()
            UiCtrl.addElement(product)
            UiCtrl.showTotal(ProdCtrl.geTotal())
        }
       
    })

    UiCtrl.table.addEventListener('click', e => {
        if(e.target.classList.contains('fa-edit')){
            let id = e.target.parentElement.parentElement.firstElementChild.textContent
            let target = e.target.parentElement.parentElement
            let product = ProdCtrl.getAndSetProductById(id)
            UiCtrl.addProductToForm(product)
            UiCtrl.editState(target)
       
    }})
    //Save Update
    UiCtrl.buttons.saveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if(UiCtrl.inputs.name.value!==''&&UiCtrl.inputs.price.value!==""){
           ProdCtrl.updateProduct(UiCtrl.inputs.name.value, UiCtrl.inputs.price.value)
           UiCtrl.updateProduct()
           UiCtrl.deleteInputValue()
        }
    })

    //Cancel Update
    UiCtrl.buttons.cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        UiCtrl.addState()
        UiCtrl.deleteInputValue()
    })

    //Delete product
    UiCtrl.buttons.deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        ProdCtrl.deleteProductById(ProdCtrl.getData().selectedProduct.id)
        document.querySelector(".bg-info").remove()
        UiCtrl.addState()
        UiCtrl.deleteInputValue()
        UiCtrl.showTotal(ProductController.geTotal())
        
    })

    return {
        init(){
            console.log('Starting app...')
            let products = ProdCtrl.getProducts()

            if(!products.length){
                UiCtrl.hideCard()
            }
            else{
                UiCtrl.createProductList(products)
            }        
        }
    }
})(ProductController, UiController, StorageController)

App.init()