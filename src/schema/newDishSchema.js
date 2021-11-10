const newDishSchema = {
  name: {
    presence: { allowEmpty: false, message: 'is required!' },
    length: {
      maximum: 64
    }
  },
  description: {
    presence: { allowEmpty: false, message: 'is required!' },
    length: {
      maximum: 256
    }
  },
  price: {
    presence: { allowEmpty: false, message: 'is required!' },
    length: {
      maximum: 128
    }
  },
  category: {
    presence: { allowEmpty: false, message: 'is required!' },
    length: {
      maximum: 64
    }
  },
  availability: {
    presence: { allowEmpty: false, message: 'is required!' },
    length: {
      maximum: 64
    }
  },
  persons: {
    presence: { allowEmpty: false, message: 'is required!' },
    length: {
      maximum: 2
    }
  },
  quantity: {
    presence: { allowEmpty: false, message: 'is required!' },
    length: {
      maximum: 2
    }
  }
};

export default newDishSchema;

/* [
    {
        "_id": "61880ab9bb8ae5bf67149413",
        "name": "Sauerkrautsuppe",
        "price": 15,
        "AvailbilityTime": [
            {
                "start": "11",
                "end": "18",
                "label": "BreakFaset",
                "_id": "61880ab9bb8ae5bf67149414"
            }
        ],
        "category": "618801fa8f92ade8a08717aa",
        "PreparitionTime": 10,
        "Persons": 2,
        "createdAt": "2021-11-07T17:19:53.180Z",
        "updatedAt": "2021 */
