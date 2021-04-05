class Partners {
    constructor() {
        document.getElementById('showPartners').addEventListener('click', () => {
            this.partners.classList.toggle('display')
        });

        this.partners = document.getElementById('partners')
        this.proceedData = []

        this.displayPartners()
    }

    getProceedData = () => (
        this.proceedData
    )

    handleApiError = (fn, callback) => (...params) => fn(params).catch(callback)

    handleChange = ({target: {dataset: {id}, checked}}) => {
        this.proceedData = this.proceedData.map(item => {
            return item.id == id ? {
                ...item,
                approved: checked
            } : {...item}
        })
    }

    createCheckbox = (id) => {
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = true
        checkbox.onchange = this.handleChange
        checkbox.dataset.id = id.toString()
        checkbox.id = id

        return checkbox
    }

    addApproved = (data) => (
        data.map(item => ({...item, approved: true}))
    )

    removeFirstElementFromNestedArray = array => (
        array.map(item => {
            item.shift()
            return item
        })
    )

    fetchData = this.handleApiError(async () => {
        const response = await fetch('https://optad360.mgr.consensu.org/cmp/v2/vendor-list.json')
        const data = await response.json()
        const onlyObjects = this.removeFirstElementFromNestedArray(Object.entries(data.vendors)).flat()
        const withApproved = this.addApproved(onlyObjects);
        this.proceedData = withApproved;

        return withApproved;
    }, (err) => console.log(err))

    displayPartners = async () => {
        const partnersData = await this.fetchData()
        this.partners.textContent = '';
        partnersData.forEach(({id, name, policyUrl}) => {
            const item = document.createElement('li')
            item.className = 'modal__list__item';

            const checkbox = this.createCheckbox(id);

            item.innerHTML = `
                <label for=${id} class='modal__list__item--columns modal__list__item'>
                    <p class='--margin' >${name}</p>
                    <p class='--margin --font__normal'>link do polityki cookie znajdziesz</p>
                    <a href=${policyUrl} class='link --margin' >tutaj</a>
                </div>
             `
            item.prepend(checkbox)
            this.partners.appendChild(item)
        })
    }
}