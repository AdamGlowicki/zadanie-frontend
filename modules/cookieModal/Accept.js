class Accept {
    constructor() {
        this.partners = new Partners();
        document.getElementById('accept').addEventListener('click', this.handleAccept)
        document.getElementById('reject').addEventListener('click', this.handleReject)
        this.modal = document.querySelector('.modal')
        this.modalContent = document.querySelector('.modal__content')
    }

    getAcceptedIds = (array) => (
        array.reduce((prev, current) => {
            return current.approved ? [...prev, current.id] : prev
        }, [])
    )

    closeModal = () => {
        this.modalContent.classList.add('--slide__out')
        this.modalContent.onanimationend = () => {
            this.modal.classList.toggle('--off')
        };
    }

    handleAccept = () => {
        const cookieData = {
            time: new Date().getTime(),
            partners: this.getAcceptedIds(this.partners.getProceedData()),
        }
        document.cookie = `approved=${JSON.stringify(cookieData)}`
        this.closeModal()
    }

    handleReject = () => {
        this.closeModal()
    }
}