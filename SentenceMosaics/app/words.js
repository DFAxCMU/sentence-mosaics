'use strict';

export const words = {
    'pronoun': {
      'color': '#f6e863',
      'categories': {
        'subject': ['I', 'we', 'he', 'she', 'they', 'you'],
        'object': ['me', 'us', 'him', 'her', 'them'],
        'possession': ['my', 'our', 'his', 'her', 'their','+']
      }
    },
    'noun': {
      'color': '#ea5e37',
      'categories': {
        'all': ['+']
      },
    },
    'preposition': {
      'color': '#c7ab7c',
      'categories': {
        'all': ['at','down','for','from','in','inside','off','on','out','outside','over','through','to','up','with','+']
      }
    },
    'aux verb': {
      'color': '#82c659',
      'categories': {
        'all': ['am','is','are','was','were','did','will', '+']
      }
    },
    'main verb': {
      'color': '#49ab41',
      'categories': {
        'all': ['+']
      },
    }, 
    'inflection': {
      'color': '#54914f',
      'categories': {
        'all': ['-ing', '-ed', '-s', '-es', '+']
      } 
    },
    'wh-': {
      'color': '#ac90c3',
      'categories': {
        'all': ['who','what','when','how','why','where', '+']
      }
    },
    'conjunction': {
      'color': '#a5a5a5',
      'categories': {
        'all': ['and','but','so','because','since', '+']
      }
    },
    'social': {
      'color': '#e48dbd',
      'categories': {
        'all': ['yes','no','please',"you're welcome", 'thank you', 'no thank you', '+']
      }
    },
    'article': {
      'color': '#50bec1',
      'categories': {
        'all': ['a','the','an','+']
      }
    },
    'adj': {
      'color': '#98bef9',
      'categories': {
        'all': ['+']
      },
    },
    'adverb': {
      'color': '#5e7bb3',
      'categories': {
        'all': ['+']
      },
    },
    'punctuation': {
      'color': '#f5f6f8',
      'categories': {
        'all': ['.','?','!',',',':',';','-','+']
      }
    }
  };