/* Global Variables */ 
const baseUrl = 'http://localhost/EST_FES_SITE/est-usmba.ac.ma_2.0/';
const file_path = 'http://localhost/EST_FES_SITE/admin_est-usmba.ac.ma/uploads/';

const endpointLogin = `${baseUrl}api/users/login`;
const endpointLogout = `${baseUrl}api/users/logout`;
const endpointRegister = `${baseUrl}api/users/register`;
const endpointUsers = `${baseUrl}api/users`;
const endpointNews = `${baseUrl}api/news`;
const endpointCategories = `${baseUrl}api/categories`;
const endpointItems = `${baseUrl}api/items`;

const searchUrl = new URLSearchParams(window.location.search)
const pageUrl = location.pathname
const pageName = pageUrl.substring(pageUrl.lastIndexOf("/") + 1)

const boxContainer = document.createElement('div')
boxContainer.classList.add('boxContainer')


/* Global Functions */ 
//////////////////////////////////////////////////////////
const fetchAllUsers = async () => {
  return await axios.get(endpointUsers)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.error(err.message)
    })
}

const fetchOneUser = async (id) => {
  return await axios.get(`${endpointUsers}?id=${id}`)
  .then(res => {
    return res.data
  })
  .catch(err => {
    console.error(err.message)
  })
}

const fetchAllNews = async () => {
  return await axios.get(endpointNews)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.error(err.message)
    })
}

const fetchOneByNewsSlug = async (slug) => {
  return await axios.get(`${endpointNews}?slug=${slug}`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.error(err.message)
    })
}

const fetchAllCats = async () => {
  return await axios.get(endpointCategories)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.error(err.message)
    })
}

const fetchOneCat = async (id) => {
  return await axios.get(`${endpointCategories}?id=${id}`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.error(err.message)
    })
}

const fetchOneByCatSlug = async (slug) => {
  return await axios.get(`${endpointCategories}?slug=${slug}`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.error(err.message)
    })
}

const fetchAllItems = async () => {
  return await axios.get(endpointItems)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.error(err.message)
    })
}

const fetchOneByItemSlug = async (slug) => {
  return await axios.get(`${endpointItems}?slug=${slug}`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.error(err.message)
    })
}

const getNewsTime = (dateStr) => {
  const dateObj = new Date(dateStr)
  const monthNames = [
    "JAVIER", "FEVRIER", "MARS", "AVRIL", 
    "MAI", "JUIN", "JUILLET", "AOUT", 
    "SEPTEMBRE", "OCTOBRE", "NOVEMBRE", "DECEMBRE"
  ];

  const day = dateObj.getDate();
  const month = monthNames[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
}

const getOtherNews = async (limit = null, withFeatured = true) => {
  const othersNews = document.createElement('div')
  const contentBox = document.createElement('div')
  othersNews.classList.add('othersNews')
  contentBox.classList.add('contentBox')

  let i = 0

  const res = await fetchAllNews()

  if(!res) {
    withFeatured 
    ? othersNews.innerHTML = `
        <div class="titre">
          <h1>Actualités et mise à jour</h1>
        </div>
        <span>Voulez vous vennir plus tard...</span>
      `
    : othersNews.innerHTML = ``

    return othersNews
  }

  
  const ordenedNews = res.reverse()
  
  
  if((!limit && limit !== 0) || limit >= ordenedNews.length) {
    limit = ordenedNews.length
  }

  if(limit < 0) {
    limit = 0
  }
  
  if(!withFeatured) {
    limit++
    i = 1
  }

  if(limit >= ordenedNews.length && !withFeatured) {
    limit = ordenedNews.length
  }

  for(i; i<limit; i++) {
    contentBox.innerHTML += `
      <div class="boxNews">
        <div class="boxNews__image">
          <img src="${ordenedNews[i].thumbnail}" alt="news">
          <a href="news.php?title=${ordenedNews[i].slug}"></a>
        </div>
        <div class="boxNews__info">
          <span>
            ${getNewsTime(ordenedNews[i].created_at)}
          </span>
          <a href="news.php?title=${ordenedNews[i].slug}">
            ${ordenedNews[i].title}
          </a>
        </div>
      </div>
    `
  }

  if(withFeatured) {
    othersNews.innerHTML = `
      <div class="titre">
        <h1>Actualités et mise à jour</h1>
      </div>
    `
  }
  othersNews.appendChild(contentBox)

  return othersNews
}


/* Index page */ 
//////////////////////////////////////////////////////////
if (pageName === '' || pageName === 'index.php') {
  const slideImg = document.querySelector('.slideImg');
  const imgBox = document.querySelectorAll('.imgBox');
  const slide2 = document.querySelector('.slide2');
  const imgBox2 = document.querySelectorAll('.imgBox2');
  const inputUsers = document.querySelectorAll('.inputUser');
  const labelInputs = document.querySelectorAll('.labelInput');
  // const selectOptions = document.querySelectorAll('.boxInput>.inputUser>option');
  let widthSlide1 = imgBox[0].clientWidth;
  let widthSlide2 = imgBox2[0].clientWidth;
  
  const interval = 3500;
  let counter = 1;
  let counterSlide2 = 1;

  const firstSectionElement = document.getElementById('firstSection')
  const secondSectionElement = document.getElementById('secondSection')

  /* SlideImg start */
  window.onresize = () => {
    widthWindow = window.innerWidth;
    widthSlide1 = imgBox[0].clientWidth;
    widthSlide2 = imgBox2[0].clientWidth;
  
    /* Scroll-header */
    if(widthWindow < 991){
      wrapper.style.position = "fixed";
      wrapper.style.top = "0";
      main.style.marginTop = "5rem";
    } else {
      wrapper.style.background = "url('./assets/img/background.png')";
    }
  }
  /* SlideImg end */
  const slide = () => {
    slideImg.style.transform = "translate("+(-widthSlide1*counter)+"px)";
    counter++;
  
    slide2.style.transform = "translate("+(-widthSlide2*counterSlide2)+"px)";
    counterSlide2++;
  
    if(counter == imgBox.length +1){
      slideImg.style.transform = "translate(0px)";
      counter = 1;
    }
  
    if(counterSlide2 == imgBox2.length +1){
      slide2.style.transform = "translate(0px)";
      counterSlide2 = 1;
    }
  }
  
  setInterval(() => {
    slide();
  }, interval);
  
  /* SlideImg end */
  
  /* Input:focus ~ label start */
  for(i=0; i < inputUsers.length; i++){
    let inputUser = inputUsers[i];
    let labelInput = labelInputs[i];
  
    inputUser.addEventListener("focusin", () => {
      if(inputUser.value == ""){
        labelInput.style.color = '#3db166';
        labelInput.style.top = "-.9rem";
        labelInput.style.left = "0";
        labelInput.style.fontSize = ".7rem";
        labelInput.style.border = ".1rem solid #3db166";
        labelInput.style.borderBottom = ".1rem solid transparent";
        inputUser.style.borderBottom = ".1rem solid #3db166";
      }
    })
    
    inputUser.addEventListener("focusout", () => {
      if(inputUser.value == ""){
        labelInput.style.color = '#96aad3';
        labelInput.style.top = "1.5rem";
        labelInput.style.left = "1rem";
        labelInput.style.fontSize = "1rem";
        labelInput.style.border = ".1rem solid transparent";
        inputUser.style.borderBottom = ".1rem solid transparent";
      }
    })
  }
  
  /* Input:focus ~ label end */
  
  
  
  /* option:hover ~ select start */
  
  // for(i=0; i < selectOptions.length; i++){
  //   let option = selectOptions[i];
  
  //   option.onclick = () => {
  //     console.log(option);
  //   }
  // }
  
  /* option:hover ~ select end */

  
  const showSectionsData = (cats, items) => {
    fetchOneByCatSlug('premier_section').then((pcat) => {
      const listCatsFirstSection = cats.filter(
        (filtCat) => filtCat.parent_category_id === pcat.id
      )
      
      const listItemsFirstSection = items.filter(
        (filtItem) => filtItem.category_id === pcat.id
      )

      listCatsFirstSection.forEach((fsCat) => {
        firstSectionElement.innerHTML += `
          <div class="box">
            <a href="category.php?title=${fsCat.slug}">
              <img 
                src="${file_path}categories/${fsCat.logo}" 
                alt="${fsCat.title}"
              />
              <div class="contentBox">
                <h3>${fsCat.name}</h3>
                <span>
                  ${fsCat.title} <i class="fa-solid fa-location-arrow"></i>
                </span>
              </div>
            </a>
          </div>
        `
      })
      
      listItemsFirstSection.forEach((fsItem) => {
        firstSectionElement.innerHTML += `
          <div class="box">
            <a href="category.php?title=${fsItem.slug}">
              <img 
                src="${file_path}categories/${fsItem.logo}" 
                alt="${fsItem.title}"
              />
              <div class="contentBox">
                <h3>${fsItem.name}</h3>
                <span>
                  ${fsItem.title} <i class="fa-solid fa-location-arrow"></i>
                </span>
              </div>
            </a>
          </div>
        `
      })

      fetchOneByCatSlug('deuxieme_section').then((dcat) => {
        const listCatsSecondSection = cats.filter(
          (filterCat) => filterCat.parent_category_id === dcat.id
        )

        const listItemsSecondSection = items.filter(
          (filtItem) => filtItem.category_id === dcat.id
        )

        listCatsSecondSection.forEach((ssCat) => {
          secondSectionElement.innerHTML += `
            <div class="box">
              <a href="category.php?title=${ssCat.slug}">
                <img 
                  src="${file_path}categories/${ssCat.logo}" 
                  alt="${ssCat.title}"
                />
                <div class="contentBox">
                  <h3>${ssCat.name}</h3>
                  <span>
                    ${ssCat.title} <i class="fa-solid fa-location-arrow"></i>
                  </span>
                </div>
              </a>
            </div>
          `
        })
        
        listItemsSecondSection.forEach((ssItem) => {
          secondSectionElement.innerHTML += `
            <div class="box">
              <a href="category.php?title=${ssItem.slug}">
                <img 
                  src="${file_path}categories/${ssItem.logo}" 
                  alt="${ssItem.title}"
                />
                <div class="contentBox">
                  <h3>${ssItem.name}</h3>
                  <span>
                    ${ssItem.title} <i class="fa-solid fa-location-arrow"></i>
                  </span>
                </div>
              </a>
            </div>
          `
        })
      })
    })
  }

  const showNews = async (allNews) => {
    const boxNews = document.getElementById('boxNews')
    const seeAllNews = document.getElementById('seeAllNews')
    const othersNews = document.createElement('div')
    const contentBox = document.createElement('div')
    othersNews.classList.add('othersNews')
    contentBox.classList.add('contentBox')

    if(!allNews) {
      seeAllNews.innerHTML = `
        <span>Voulez vous venir plus tard...</span>
      `
      return
    }
    
    const ordenedNews = allNews.reverse()
    
    seeAllNews.innerHTML = `
      <a href="news.php">Lire toutes les actualités</a>
    `
    
    boxNews.innerHTML = `
      <div class="contentBox">
        <div class="boxNews__image">
          <img src="${ordenedNews[0].thumbnail}" alt="Nouvelles en vedette">
          <a href="news.php?title=${ordenedNews[0].slug}"></a>
        </div>
        <div class="boxNews__info">
          <span>
            ${getNewsTime(ordenedNews[0].created_at)}
          </span>
          <a href="news.php?title=${ordenedNews[0].slug}">
            ${ordenedNews[0].title}
          </a>
        </div>
      </div>
    `

    boxNews.appendChild(await getOtherNews(3, false))
  }

  fetchAllCats().then((cats) => {
    fetchAllItems().then((items) => {
      showSectionsData(cats, items)
    })
  })

  fetchAllNews().then((allNews) => {
    showNews(allNews)
  })
}


/* Items page */ 
//////////////////////////////////////////////////////////
if(pageName === 'item.php') {
  const title = searchUrl.get('title')
  const itemsPage = document.getElementById('itemsPage')

  if(!title || title === '') {
    itemsPage.innerHTML = `
      <div class="headline">
        <h1>Error...</h1>
        <h2>Sorry invalid title...</h2>
      </div>
    `
  } else {

    const showItemData = (item) => {
      if(!item) {
        itemsPage.innerHTML = `
          <div class="headline">
            <h1>Error...</h1>
            <h2>Sorry no such data...</h2>
          </div>
        `
        return
      }

      const data_content = JSON.parse(item.data_content)

      itemsPage.innerHTML = `
        <div class="headline">
          <h1>${item.category_name}</h1>
          <h2>${item.title}</h2>
        </div>
      `

      boxContainer.innerHTML = ''
      data_content.forEach((data) => {
        boxContainer.innerHTML += `
          <div class="box">
            <div class="titre-container">
              <h2>${data.title}</h2>
            </div>
            <div class="box-content">
              ${data.description}
            </div>
          </div>
        `
      })

      if(item.file || item.file !== '') {
        boxContainer.innerHTML += `
          <div class="box">
            <div class="titre-container">
              <h2>Plus info</h2>
            </div>
            <div class="box-info">
              <a href="${file_path}files/${item.file}?>" download="${item.file.substring(10)}" class="btn">Telecharger fichier <i class="fa fa-angle-right"></i></>
            </div>
          </div>
        `
      }

      itemsPage.appendChild(boxContainer)
    }

    fetchOneByItemSlug(title)
    .then((item) => {
      showItemData(item)
    })

  }
}

/* Category page */ 
//////////////////////////////////////////////////////////
if(pageName === 'category.php') {
  const title = searchUrl.get('title')
  const categoriesPage = document.getElementById('categoriesPage')

  if(!title || title === '') {
    categoriesPage.innerHTML = `
      <div class="headline">
        <h1>Error...</h1>
      </div>
      <h1>Sorry invalid title...</h1>
    `
  } else { 
    const showCatData = (cat) => {
      if(!cat) {
        categoriesPage.innerHTML = `
          <div class="headline">
            <h1>Error...</h1>
          </div>
          <h1>Sorry no such data...</h1>
        `
        return
      }

      categoriesPage.innerHTML = `
        <div class="headline">
          <h1>${cat.title}</h1>
        </div>
        <h1>EST-Fes <i class="fa-solid fa-graduation-cap"></i></h1>
      `

      fetchAllCats().then((allCats) => {
        const filteredCat = allCats.filter(
          (ct) => ct.parent_category_id === cat.id
        )

        boxContainer.innerHTML = ''
        filteredCat.forEach((fCat) => {
          boxContainer.innerHTML += `
            <div class="box">
              <img src="${file_path}categories/${fCat.logo}" alt="${fCat.title}">
              <div class="content-Box">
                <h3>${fCat.name}</h3>
                <a href="#">${fCat.title} <i class="fa-solid fa-location-arrow"></i></a>
              </div>
            </div>
          `
        })

        categoriesPage.appendChild(boxContainer)
      })

      fetchAllItems().then((allItems) => {
        const filteredItems = allItems.filter(
          (it) => it.category_id === cat.id
        )

        filteredItems.forEach((fItem) => {
          boxContainer.innerHTML += `
            <div class="box">
              <img src="${file_path}items/${fItem.logo}" alt="${fItem.title}">
              <div class="content-Box">
                <h3>${fItem.name}</h3>
                <a href="item.php?title=${fItem.slug}">
                  ${fItem.title} <i class="fa-solid fa-location-arrow"></i>
                </a>
              </div>
            </div>
          `
        })
      })
      
    }

    fetchOneByCatSlug(title)
    .then((cat) => {
      showCatData(cat)
    })
    
  }
}

/* News page */ 
//////////////////////////////////////////////////////////
if(pageName === 'news.php') {
  const title = searchUrl.get('title')
  const newsPage = document.getElementById('newsPage')
  const wrapperContainer = document.createElement('div')
  wrapperContainer.classList.add('wrapperContainer')

  if(!title || title === '') {
    newsPage.innerHTML = `
      <div class="headline">
        <h1>News</h1>
        <h2>Voulez choisir une nouvelle</h2>
      </div>
    `

    getOtherNews().then(res => {
      wrapperContainer.appendChild(res)
    })
      
    boxContainer.appendChild(wrapperContainer)
    newsPage.appendChild(boxContainer)
  } else {

    const showNewsData = async (news) => {
      if(!news) {
        newsPage.innerHTML = `
          <div class="headline">
            <h1>News</h1>
            <h2>Voulez choisir une nouvelle</h2>
          </div>
        `

        getOtherNews().then(res => {
          wrapperContainer.appendChild(res)
        })
          
        boxContainer.appendChild(wrapperContainer)
        newsPage.appendChild(boxContainer)
        return
      }

      newsPage.innerHTML = `
        <div class="headline">
          <h1>News</h1>
          <h2>${news.title}</h2>
        </div>
      `
      wrapperContainer.innerHTML = `
        <div class="box">
          <div class="box-content">
            ${news.content}
          </div>
        </div>
      `
      wrapperContainer.appendChild(await getOtherNews())
      
      boxContainer.appendChild(wrapperContainer)
      newsPage.appendChild(boxContainer)
    }

    fetchOneByNewsSlug(title).then((news) => {
      showNewsData(news)
    })
  }
}