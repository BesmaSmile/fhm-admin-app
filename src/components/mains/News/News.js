import React, { useState, useEffect } from 'react';
import { newsActions } from 'store/actions';
import { connect } from 'react-redux';
import { hooks } from 'functions';
import { Button, Tooltip } from '@material-ui/core';
import { storageService } from 'services';
import { ButtonWrapper } from 'components/misc/PermissionWrappers/PermissionWrappers';
import { permissionConstants } from 'consts';
import { useDialog } from 'components/misc/Dialog/Dialog';
import NewsForm from 'components/misc/NewsForm/NewsForm';
import {format} from 'date-fns';
import './News.scss';

const NewsCard = ({ news }) => {
  const [_pictureUrl, _setPictureUrl] = useState()
  const pictureRequest = hooks.useRequest()

  useEffect(() => {
    _setPictureUrl()
    pictureRequest.execute({
      action: () => storageService.getFileUrl(`news/${news.id}`),
      success: (url) => _setPictureUrl(url)
    })
    // eslint-disable-next-line
  }, [news])

  return (
    <Tooltip title={news.text} placement='bottom'>
      <div className='news-card'>
        {_pictureUrl && <img src={_pictureUrl} alt={news.title} />}
        <div className='mar20'>
          <p className='news-title marb10 medium cmain fs25'>{news.title}</p>
          <p className='fs14 marb10 cstronggrey'>Ajouté le {news.createdAt ? format(news.createdAt,'dd/MM/yyyy HH:mm') : ''}</p>
          <p className='news-text'>{news.text}</p>
        </div>
      </div>
    </Tooltip>
  )
}
const News = (props) => {
  const newsRequest = hooks.useRequest()
  const formDialog = useDialog()

  useEffect(() => {
    if (!props.news) {
      loadNews()
    }
    // eslint-disable-next-line
  }, [])

  const loadNews = () => {
    newsRequest.execute({
      action: props.getNews
    })
  }

  const openNewsForm = (news, pictureUrl) => {
    const newsForm = <NewsForm news={news}
      addNews={props.addNews}
      close={formDialog.close} />

    formDialog.open(newsForm, true)
  }

  return (
    <div className='News relw100'>
      <div className='news-header pad20 flex jcsb'>
        {!newsRequest.pending && props.news && 
          <>
            <div className='medium fs25 cstronggrey'>Nouveauté</div>
            <ButtonWrapper
              neededPermission={permissionConstants.ADD_NEWS}
              button={(disabled) => <Button variant="contained"
                disabled={disabled || newsRequest.pending}
                classes={{
                  root: 'news-newButton',
                  contained: 'news-newButton_contained',
                  label: 'news-newButton_label'
                }}
                onClick={() => openNewsForm()}
              >
                Ajouter nouvelle
            </Button>} />
          </>
        }
        {newsRequest.pending && <div>Chargement en cours...</div>}
        {newsRequest.error && <div className='cred'>{newsRequest.error.message}</div>}
      </div>
      <div className='mar30'>
        {props.news && (
          <div className='flex row fww'>
            {props.news.map((ne, i) => (
              <NewsCard key={i} news={ne} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const mapState = (state) => ({
  news: state.news.news,
  user: state.auth.user
})

const actionCreators = {
  getNews: newsActions.getNews,
  addNews: newsActions.addNews
}

export default connect(mapState, actionCreators)(News);