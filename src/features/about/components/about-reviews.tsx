import { ReviewsCarousel } from './reviews-carousel'

interface Review {
  author_name: string
  profile_photo_url: string
  rating: number
  text: string
  relative_time_description: string
}

interface PlaceDetails {
  rating: number
  user_ratings_total: number
  reviews: Review[]
}

async function getReviews(): Promise<PlaceDetails | null> {
  const key     = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID
  if (!key || !placeId) return null

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,reviews,user_ratings_total&language=es&key=${key}`,
      { next: { revalidate: 86400 } }
    )
    const data = await res.json()
    if (data.status !== 'OK') return null
    return data.result
  } catch {
    return null
  }
}

export async function AboutReviews() {
  const place = await getReviews()

  const reviews =
    place?.reviews?.filter((r) => r.text.trim().length > 0 && r.rating >= 4) ?? []

  if (reviews.length === 0) return null

  return (
    <section
      aria-labelledby="reviews-heading"
      className="bg-muted/40 px-4 py-16 dark:bg-lizzu-deep/60 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <ReviewsCarousel
          reviews={reviews}
          overallRating={place?.rating ?? 5}
          totalRatings={place?.user_ratings_total ?? reviews.length}
        />
      </div>
    </section>
  )
}
