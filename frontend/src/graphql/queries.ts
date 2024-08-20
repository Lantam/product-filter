import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts($first: Int!, $after: String) {
    allProducts(first: $first, after: $after) {
      edges {
        node {
          id
          title
          price
          description
          discount
          stock
          available
          image
          averageRating
          numberOfRatings
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    allCategories {
      id
      name
      description
    }
  }
`;

export const GET_ALL_SUPPLIERS = gql`
  query GetAllSuppliers {
    allSuppliers {
      id
      name
      contactEmail
      phoneNumber
      address
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($productId: ID!) {
    productById(productId: $productId) {
      id
      title
      price
      description
      discount
      stock
      available
      createdAt
      updatedAt
      category {
        name
      }
      image
      averageRating
      numberOfRatings
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($categoryId: ID!) {
    productsByCategory(categoryId: $categoryId) {
      id
      title
      price
      description
      discount
      stock
      available
      createdAt
      updatedAt
      category {
        id
        name
      }
      supplier {
        id
        name
      }
      image
    }
  }
`;