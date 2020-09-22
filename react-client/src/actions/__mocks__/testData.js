export const testState = {
  prods: {
    a: {
      _id: 'a',
      sku: 1,
      descr: 'test',
      size: '1 oz',
      oil: {
        photosensitive: true,
        topical: true,
        dilute: true
      },
      uses: ['test use'],
      contains: [
        {
          _id: 'contentId',
          descr: 'content 1',
          category: 'content category'
        }
      ],
      ingredients: [
        {
          _id: 'ingredient',
          product: 'contentId',
          qty: 'n/a'
        }
      ],
      containedIn: [
        {
          _id: 'containerId',
          descr: 'container',
          category: 'container category'
        }
      ],
      posts: [
        {
          _id: 'postId',
          title: 'postTitle',
          content: 'postContent',
          image: 'postImage'
        }
      ],
      inventory: [
        {
          apiKey: 'badkitteh',
          prod: 'a',
          qty: 9,
          wishlist: null
        }
      ]
    },
    b: {
      _id: 'b',
      sku: 2,
      descr: 'test2',
      contains: [],
      containedIn: []
    }
  },
  recipes: {
    testRecipe: {
      title: 'test recipe',
      directions: 'test directions',
      uses: [
        {
          _id: 'useId',
          title: 'recipe use'
        }
      ],
      ingredients: [{
        _id: 'ingrId1',
        qty: '1 drop',
        product: {
          _id: 'prodId1',
          descr: 'test prod ingredient'
        }
      }]
    }
  }
}
export const testContains = {
  contentId: {
    _id: 'contentId',
    descr: 'content 1',
    category: 'content category'
  },
  b: {
    _id: 'b',
    descr: 'test2',
    category: 'content category'
  }
}
export const testState2 = {
  prods: {
    a: {
      _id: 'a',
      sku: 1,
      descr: 'first',
      size: '1 oz',
      qty: 9,
      wishlist: false
    },
    b: {
      _id: 'b',
      sku: 2,
      descr: 'second',
      size: '1 oz',
      qty: 9,
      wishlist: true
    }
  }
}
export const testUses = [
  {
    _id: 'createdUseId',
    title: 'createdUseTitle'
  },
  {
    _id: 'firstUseId',
    title: 'firstUseTitle'
  },
  {
    _id: 'secondUseId',
    title: 'secondUseTitle'
  }
]
