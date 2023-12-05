import React, { useEffect, useState } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { API_URL } from '../../../config'
import AdCard from '../../features/AdCard/AdCard'

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
		<div className={'container'}>
			<h2 className='my-4' >Searched advertisements</h2>
			<h2>Search phrase: &quot;{searchPhase}&quot;</h2>
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

			<div className='d-flex justify-content-start flex-wrap mt-4'>
				{adsToShow.map((ad, i) => (
					<AdCard key={ad._id} ad={ad}/>
				))}
			</div>
		</div>
	)
};

export default SearchedAd;