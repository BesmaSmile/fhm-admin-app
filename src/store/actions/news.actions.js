import { newsService } from 'services';
import { newsConstants } from 'store/constants';

export const newsActions = {
  getNews,
  addNews,
}

function getNews() {
  return dispatch => {
    return newsService.getNews().then(news => {
      dispatch({ type: newsConstants.GET_NEWS, news })
      return news;
    })
  }
}

function addNews(news, picture) {
  return dispatch => {
    return newsService.addNews(news, picture).then((news) => {
      dispatch({ type: newsConstants.ADD_NEWS, news })
      return news;
    })
  }
}
