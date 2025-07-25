document.addEventListener("DOMContentLoaded" , ()=> {

    //상단메뉴(서브) 애니메이션
    const mainmenu = document.querySelectorAll('a.mainmenu');
    const bg = document.querySelector('#bg_white');
    const multiEvent = ['mouseenter' , 'focus'];
    multiEvent.forEach( i=> {
       mainmenu.forEach( j=> {
            //마우스갖다댄 메인메뉴
            j.addEventListener( i, e=> {                
                bg.classList.add('active'); //서브메뉴아래 흰바탕
                //모든 서브메뉴 클래스(active) 제거한다.
                mainmenu.forEach( m=> {
                    m.nextElementSibling.classList.remove('active');
                    m.nextElementSibling.querySelectorAll('a').forEach( a=> a.classList.remove('active'));
                });

                //마우스를갖다댄 메인메뉴의 서브메뉴
                const sub =  e.currentTarget.nextElementSibling;               
                sub.classList.add('active');
                sub.querySelectorAll('a').forEach( (a,index) => {
                        setTimeout(()=> {
                            a.classList.add('active');
                        } , 200* index);
                });   
            });
       });    
    });

    //메뉴에서 마우스가  벗어나면
    const notMenuLinks = [...document.querySelectorAll('header ul li > a:not(.mainmenu)')];

    const sub_out = ()=> {
        // 서브메뉴 배경 제거
        bg.classList.remove('active');

        // .mainmenu 바로 뒤에 있는 모든 nav 비활성화
        const subMenus = document.querySelectorAll('.mainmenu + nav');
        subMenus.forEach( nav => {
            nav.classList.remove('active');
            const links = nav.querySelectorAll('a');
            links.forEach(j => j.classList.remove('active'));
        });
    }
    notMenuLinks.forEach(link => {
        link.addEventListener('mouseenter', () => { sub_out()  });
    });
    const header = document.querySelector('header');
    header.addEventListener('mouseleave', ()=> { sub_out()  });
        

   
    //상단 오른쪽 (창업문의) 버튼    
    const topBtn = document.querySelector("header button#radio");
    topBtn.addEventListener('click' , ()=> {
        topBtn.classList.toggle('active');
        const b =  topBtn.querySelector('b');
        //console.log( b.textContent === '창업문의');
        b.textContent=   b.textContent==='창업문의'  ?  'BRAND' : '창업문의';
    });

    //모바일화면에서 상단오른쪽 햄버거 ▤ 아이콘을 누를때
    const menu = document.querySelector('header button#menu');
    const header_ul = document.querySelector('header ul');
    menu.addEventListener("click",()=>{
		document.body.classList.toggle('active');
        menu.classList.toggle('active');
        header_ul.classList.toggle('active')
    });

    //모바일화면에서 메인메뉴 [ ^ ] 토글시키기
    mainmenu.forEach( i => {
        i.addEventListener( 'click', e => {
            //e.preventDefault();  
			bg.classList.remove('active');
            const target = e.currentTarget;          
            mainmenu.forEach( j => {
                j !== target  ? 
                j.classList.remove('active')  : 
                null               
            });                    
            setTimeout( ()=> {
                target.classList.toggle('active')
            }, 10 );         
        });
    });


    //메인페이지 상단 큰 이벤트배너 오른쪽 위에서 2번째 슬라이드
    const event_big_slide_2 = document.querySelector(".event_big.slide section");
    const slide_2_pos_bar =   document.querySelectorAll('.event_big.slide .pos_bar button');
    
    const toLeft = ()=> {

        event_big_slide_2.style.transition = "left 1s";
        event_big_slide_2.style.left = "-100%";
        slide_2_pos_bar.forEach( i=> i.classList.remove('active'));
        slide_2_pos_bar[1].classList.add('active');

        setTimeout( ()=>{
            event_big_slide_2.style.transition = "none";
            event_big_slide_2.style.left = "0px";
            event_big_slide_2.append( event_big_slide_2.firstElementChild );
            slide_2_pos_bar.forEach( i=> i.classList.remove('active'));
            slide_2_pos_bar[0].classList.add('active'); 
        }, 1000);
    }

    let interval = setInterval( toLeft , 2500 );

    slide_2_pos_bar.forEach( i => {
            i.addEventListener('click' ,  ()=> {
                slide_2_pos_bar.forEach( j=> j.disabled = true);//버튼 클릭안됨
                clearInterval( interval );            
                toLeft();
                setTimeout(()=> { 
                    interval = setInterval( toLeft , 2500 ) ;
                    slide_2_pos_bar.forEach( j=> j.disabled = false);//버튼은 다시 클릭됨.
                }, 1100)
            } );
    });


	//NEW & EVENT 슬라이드-------------------------------
	const new_event_slide = document.querySelector('#new_event .slide');
	let new_event_a = document.querySelectorAll("#new_event .slide a");
	const new_event_bar = document.querySelectorAll('#new_event .pos_bar button');
	let bar_num = 0;

	let isSliding = false;
	let autoSlideInterval;
	const autoSlideDelay = 2600;

	// 왼쪽 슬라이드 (다음)
	new_event_slide.style.left = "-75%";
	const toLeft_new = () => {
		if (isSliding) return;
		isSliding = true;		

		new_event_slide.style.transition = "left 1s";
		new_event_slide.style.left = "-125%";		

		new_event_a.forEach(i => i.classList.remove('active'));
		new_event_a[3].classList.add('active');

		setTimeout(() => {
			new_event_slide.style.transition = "none";
			new_event_slide.append(new_event_slide.firstElementChild);
			new_event_slide.style.left = "-75%";

			new_event_a = document.querySelectorAll("#new_event .slide a");
			new_event_a[2].classList.add('active');

			bar_num = (bar_num + 1) % new_event_bar.length;
			new_event_bar.forEach(i => i.classList.remove('active'));
			new_event_bar[bar_num].classList.add('active');

			isSliding = false;
		}, 1000);
	};

	// 오른쪽 슬라이드 (이전)
	const toRight_new = () => {
		if (isSliding) return;
		isSliding = true;

		new_event_slide.style.transition = "left 1s";
		new_event_slide.style.left = "-25%";
		
		new_event_a.forEach(i => i.classList.remove('active'));
		new_event_a[1].classList.add('active');

		// 이동 후 정리
		setTimeout(() => {
			
			new_event_slide.style.transition = "none";
			new_event_slide.style.left = "-75%";
			new_event_slide.prepend(new_event_slide.lastElementChild);						
			
			new_event_a = document.querySelectorAll("#new_event .slide a");
			new_event_a.forEach(i => i.classList.remove('active'));
			new_event_a[2].classList.add('active'); // 다시 중앙

			bar_num = (bar_num - 1 + new_event_bar.length) % new_event_bar.length;
			new_event_bar.forEach(i => i.classList.remove('active'));
			new_event_bar[bar_num].classList.add('active');

			isSliding = false;
		}, 1000);
	};


	const startAutoSlide = () => {
		autoSlideInterval = setInterval(toLeft_new, autoSlideDelay);
	};

	const stopAutoSlide = () => {
		clearInterval(autoSlideInterval);
	};

	startAutoSlide();

	// 터치 이벤트
	let startX = 0;
	let endX = 0;

	new_event_slide.addEventListener('touchstart', e => {
		stopAutoSlide();
		startX = e.touches[0].clientX;
	}, { passive: true });

	new_event_slide.addEventListener('touchend', e => {
		endX = e.changedTouches[0].clientX;
		const deltaX = endX - startX; //처음손가락의 X위치 - 마지막손가락의 X위치

		// 50픽셀 이상 손가락을 이동했을 때만 슬라이드 동작 (실수 방지용) 
		if (Math.abs(deltaX) > 50 && !isSliding) {

			// 왼쪽으로 스와이프(터치) 한 경우 (다음 슬라이드로 이동)
			if (deltaX < 0) {
				toLeft_new(); 
			} 
			
			// 오른쪽으로 스와이프(터치) 한 경우 (이전 슬라이드로 이동)
			else {
				toRight_new(); 
			}
		}


		setTimeout(startAutoSlide, 3000);
	}, { passive: true });





    //모바일용 이미지로 변경 -- NEW EVENT 슬라이드에서 이미지주소 변경    
    const changeImgSrc = () => {
        const new_event_img = document.querySelectorAll('#new_event .slide img');
        new_event_img.forEach(i => {
            const imgSrc = i.getAttribute('src');

            // 중복 변경 방지
            if (!imgSrc.includes('event_m')) {
                const changeSrc = imgSrc.replace('event_', 'event_m');
                i.setAttribute('src', changeSrc);
            }
        });
    };

    const restoreImgSrc = () => {
        const new_event_img = document.querySelectorAll('#new_event .slide img');
        new_event_img.forEach(i => {
            const imgSrc = i.getAttribute('src');

            // 모바일용이면 데스크탑용으로 복원
            if (imgSrc.includes('event_m')) {
                const originalSrc = imgSrc.replace('event_m', 'event_');
                i.setAttribute('src', originalSrc);
            }
        });
    };

    // 초기 로딩 시
    if (window.innerWidth <= 840) {
        changeImgSrc(); //모바일용 이미지
    } else {
        restoreImgSrc();//데스크탑용 이미지
    }

    // 리사이즈 시 반응
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 840) {
            changeImgSrc();
        } else {
            restoreImgSrc();
        }
    });


});//js all finished;----------------------------------