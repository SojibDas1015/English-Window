const faqBtn = getId('faqBtn');
const learnBtn = getId('learnBtn');
const faqSection = getId('faqSection');
const learnSection = getId('learnSection');
faqBtn.addEventListener('click', () => {
    faqSection.scrollIntoView({
        behavior: 'smooth'
    })
})
learnBtn.addEventListener('click', () => {
    learnSection.scrollIntoView({
        behavior: 'smooth'
    })
})
const disable = () => {
    const btnDisable = document.getElementsByClassName('bg-btnBgLearn');
    for (const btn of btnDisable) {
        btn.classList.remove('bg-btnBgLearn')
        btn.classList.remove('text-white')
    }
}
const enable = (active) => {
    active.classList.add('bg-btnBgLearn')
    active.classList.add('text-white')
}
const learBtnLoad = () => {
    const learnBtnContainer = getId('learnBtnContainer');
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => displaylearBtn(data.data))
}
const loadLesson = (id, btnid) => {
    disable()
    const selectBtn = getId(btnid)
    enable(selectBtn);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url).then(res => res.json()).then(data => {
        displayLesson(data.data.slice(0, 9))
    })
}
const loadModal = (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    fetch(url).then(res => res.json()).then(data => displayModal(data.data))
}
const displayModal = (data) => {
    const learnModal = getId('learnModal')
    learnModal.showModal();
    const modalBoxContainer = getId('modalBoxContainer');
    modalBoxContainer.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card bg-base-100 shadow-sm px-0 min-h-75">
                    <div class="card-body space-y-2">
                        <h2 class="card-title justify-left text-3xl font-bold">${data.word} (<i class="fa-solid fa-microphone-lines"></i> : ${data.pronunciation})</h2>
                        <p class="text-xl font-semibold font-Hind"><span class="font-Poppins">Meaning</span><br> ${data.meaning}</p>
                        <p class="text-xl font-semibold font-Hind"><span class="font-Poppins">Example</span><br> ${data.sentence}</p>
                        <p class="text-xl font-semibold font-Hind">সমার্থক শব্দ গুলো</p>
                        <div id="mainContent" class="flex gap-2">
                        </div>
                    </div>
                </div>
                <div class="modal-action justify-start">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn bg-btnBg text-white rounded-lg">Complete Learning</button>
                    </form>
                </div>
    
    `
    modalBoxContainer.append(div);
    data.synonyms.map(data => {
        const divBtn = document.createElement('div')
        const mainContent = getId('mainContent');
        divBtn.innerHTML = `
        <button class="btn bg-learIcon">${data}</button>    
        `
        mainContent.appendChild(divBtn)
    })




}
const displaylearBtn = (displayBtn) => {
    const learnBtnContainer = getId('learnBtnContainer');
    for (const btn of displayBtn) {
        const div = document.createElement('div');
        div.innerHTML = `
        <button id="${btn.id}" onclick="loadLesson(${btn.level_no}, ${btn.id})" class="font-Poppins font-semibold text-xs text-btnBgLearn py-2.5 px-3.5 border-2 rounded-md hover:bg-btnBgLearn hover:text-white cursor-pointer">Lesson-${btn.level_no}</button>
        `
        learnBtnContainer.append(div);
    }
}
const displayLesson = (lessons) => {
    const lessonContainer = getId('lessonContainer');
    lessonContainer.innerHTML = '';
    if (lessons.length == 0) {

        lessonContainer.innerHTML = `
        <div id="lessonSelect" class="col-span-full space-y-3">
        <div class="flex justify-center">
        <img src="assets/alert-error.png" alt="">
        </div>
        <p class="font-Hind font-normal text-xs text-center">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h3 class="font-Hind font-medium text-3xl text-center">নেক্সট Lesson এ যান</h3>
        </div>
        `
        return
    }
    for (const lesson of lessons) {
        const div = document.createElement('div');
        div.innerHTML = `
    <div class="card bg-base-100 shadow-sm px-0 min-h-75">
                    <div class="card-body space-y-2">
                        <h2 class="card-title justify-center text-3xl font-bold">${lesson.word}</h2>
                        <p class="text-center">Meaning / Pronounciation</p>
                        <h2 class="card-title justify-center font-Hind font-semibold text-xl text-center">"${lesson.meaning} / ${lesson.pronunciation}"</h2>
                        <div class="card-actions justify-between pt-12">
                            <button onclick="loadModal(${lesson.id})" class="btn bg-learIcon"><i class="fa-solid fa-circle-info"></i></button>
                            <button class="btn bg-learIcon"><i class="fa-solid fa-volume"></i></button>
                        </div>
                    </div>
                </div>
    `
        lessonContainer.append(div);
    }

}

const displayShow = () => {
    const navbar = getId('navbar');
    const header = getId('heading');
    const main = getId('main');
    const logOut = getId('logOut');
    // navbar.classList.remove('hidden')
    document.getElementById('loginBtn').addEventListener('click', (e) => {
        const passwordField = getId('passwordField');
        const convertValue = parseInt(passwordField.value);
        if (convertValue === 123456) {
            navbar.style.display = 'block';
            main.style.display = 'block';
            header.style.display = 'none';
            
        }
    })
    document.getElementById('logOut').addEventListener('click', () => {
        navbar.style.display = 'none';
        main.style.display = 'none';
        header.style.display = 'flex';
    })
}
displayShow()
learBtnLoad()
