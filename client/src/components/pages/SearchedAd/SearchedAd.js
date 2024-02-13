import styles from './SearchedAd.module.scss'
import React, { useEffect, useState } from 'react'
import { Alert, Row, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { API_URL } from '../../../config'
import AdCard from '../../features/AdCard/AdCard'
import Title from '../../common/Title/Title'
import Container from '../../common/container/Container'
import SearchForm from '../../features/SearchForm/SearchForm'

const SearchedAd = () => {
  const { searchPhase } = useParams()
	const [status, setStatus] = useState(null)
	const [adsToShow, setAdsToShow] = useState([])

	useEffect(() => {
		setStatus('loading')

		const options = {
			method: 'GET',
		}
		fetch(`${API_URL}/ads/search/${searchPhase}`, options)
			.then(res => {
				if (res.status !== 200) {
					setStatus('serverError')
				} else {
					setStatus('')
					return res.json()
				}
			})
			.then(ads => setAdsToShow(ads))
			.catch(() => setStatus('serverError'))
	}, [searchPhase])
	if (!adsToShow) return <p>Nothing matches your search....</p>

	return (
		<div className={styles.root}>
			<SearchForm />
			<Container>
				<Title>Searched advertisements</Title>
				<h4>Searched in: title, content, location</h4>
				<h4>Searched phrase: &quot;{searchPhase}&quot;</h4>
				{status === 'loading' && (
					<Spinner animation='border' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</Spinner>
				)}

				{status === 'serverError' && (
					<Alert variant='danger'>
						<Alert.Heading>Something went wrong...</Alert.Heading>
						<p>Unexpected error...Try again!.</p>
					</Alert>
				)}

				<Row>
					{adsToShow.map((ad, i) => (
						<AdCard key={ad._id} ad={ad}/>
					))}
				</Row>
			</Container>
		</div>
	)
};

export default SearchedAd;