class CookieChecker {
    constructor() {
        this.approved = 'approved'
        this.modal = document.querySelector('.modal')
        this.isDisplayModal()
    }

    getCookie = (name) => {
        return document.cookie.split(';').find(c => {
            return c.trim().startsWith(name + '=');
        });
    }

    parseCookieToDate = (name) => {
        return JSON.parse(this.getCookie(name).replace(`${name}=`, ''))

    }

    checkIfCookieExist = (name) => {
        return document.cookie.split(';').find(c => {
            return c.trim().startsWith(name + '=');
        });
    }

    checkIfNotNextDay = () => {
        const time = this.parseCookieToDate(this.approved).time
        const timePlusDay = time + (24 * 3600 * 1000)
        return timePlusDay > new Date().getTime();
    }

    isDisplayModal = () => {
        if (this.checkIfCookieExist(this.approved) && this.checkIfNotNextDay()) {
            this.modal.classList.add('--off')
        }
    }
}