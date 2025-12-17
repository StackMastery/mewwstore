export const bannerQuery = `*[_type == "slider"]{
  label,
  title,
  "img": image.asset->url,
  link
}`;

export const categoriesToolsQuery = `
  *[_type == "categoryTool"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    link,
    icon {
      asset->{
        _id,
        url
      },
      alt
    }
  }
`;

export const multiSectionQuery = `*[_type == "banner"]{
  title,
  buttonText,
  href,
  "img": image.asset->url
}`;

export const trendingQuery = `*[_type == "trendingProducts"][0]{
  products[]->{
    name,
    price,
    discount,
    "thumb": thumb.asset->url,
    slug,
    category->{
      name,
      "link": slug.current
    }
  }
}`;

export const productQuery = `*[_type == "product"][0...10]{
  name,
  price,
  discount,
  "thumb": thumb.asset->url,
  "slug": slug.current,
  category->{
    name,
    "link": slug.current
  }
}`;
