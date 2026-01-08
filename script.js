function goPractice(type) {
    if (!appData) return;
    
    // 進入練習前，根據身分切換首頁金句（下次回到首頁就會看到新的）
    if (type === 'kids' || type === 'primary') {
        setRandomQuote('kids');
    } else if (type === 'teen') {
        setRandomQuote('teen');
    } else {
        setRandomQuote('adult');
    }

    showPage('content-page');
    const sets = appData.practicePool[type];
    const selectedSteps = sets[Math.floor(Math.random() * sets.length)];
    play(selectedSteps);
}

function setRandomQuote(category = 'adult') {
    if (!appData) return;
    let pool;
    if (category === 'kids') pool = appData.quotes_kids;
    else if (category === 'teen') pool = appData.quotes_teen;
    else pool = appData.quotes_adult;

    const q = pool[Math.floor(Math.random() * pool.length)];
    document.getElementById('random-quote').innerHTML = q;
}
