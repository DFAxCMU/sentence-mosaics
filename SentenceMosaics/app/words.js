'use strict';

export const words = {
    'pronoun': {
      'color': '#f6e863',
      'custom': false,
      'categories': {
        'subject': ['I', 'we', 'he', 'she', 'they', 'you'],
        'object': ['me', 'us', 'him', 'her', 'them'],
        'possession': ['my', 'our', 'his', 'her', 'their']
      }
    },
    'noun': {
      'color': '#ea5e37',
      'custom': true,
      'categories': {},
    },
    'preposition': {
      'color': '#c7ab7c',
      'custom': false,
      'categories': {
        'all': ['in','out','over','on','off','to','at','for','up','down','outside','inside','from','through']
      }
    },
    'aux verb': {
      'color': '#82c659',
      'custom': false,
      'categories': {
        'all': ['am','is','are','was','were','did','will']
      }
    },
    'main verb': {
      'color': '#49ab41',
      'custom': true,
      'categories': {},
    }, 
    'inflection': {
      'color': '#54914f', 
      'custom': false,
      'categories': {
        'all': ['-ing', '-ed', '-s', '-es']
      } 
    },
    'wh-': {
      'color': '#ac90c3',
      'custom': false,
      'categories': {
        'all': ['who','what','when','how','why','where']
      }
    },
    'conjunction': {
      'color': '#a5a5a5',
      'custom': false,
      'categories': {
        'all': ['and','but','so','because','since']
      }
    },
    'social': {
      'color': '#e48dbd',
      'custom': false,
      'categories': {
        'all': ['yes','no','please',"you're welcome", 'thank you', 'no thank you']
      }
    },
    'article': {
      'color': '#50bec1',
      'custom': false,
      'categories': {
        'all': ['a','the','an']
      }
    },
    'adj': {
      'color': '#98bef9',
      'custom': true,
      'categories': {},
    },
    'adverb': {
      'color': '#5e7bb3',
      'custom': true,
      'categories': {},
    },
    'punctuation': {
      'color': '#f5f6f8',
      'custom': false,
      'categories': {
        'all': ['.','?','!']
      }
    }
  };