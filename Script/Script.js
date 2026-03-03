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

const learBtnLoad = () => {
    const learnBtnContainer = getId('learnBtnContainer');
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => displaylearBtn(data.data))
}
const displaylearBtn = (displayBtn) => {
    const learnBtnContainer = getId('learnBtnContainer');
    for(const btn of displayBtn){
        const div = document.createElement('div');
        div.innerHTML = `
        <button class="font-Poppins font-semibold text-xs text-textNBg py-2.5 px-3.5 border-2 rounded-md hover:bg-btnBg hover:text-white cursor-pointer">Lesson-${btn.level_no}</button>
        `
        learnBtnContainer.append(div);
    }
}
learBtnLoad()
