define({ "api": [
  {
    "type": "post",
    "url": "/paste",
    "title": "Add a new paste",
    "name": "AddPaste",
    "group": "Paste",
    "description": "<p>Add a new paste based on it's attributes</p>",
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Object",
            "optional": false,
            "field": "paste",
            "description": "<p>The created paste object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.0 201 Created\n{\n    \"name\": \"Example\",\n    \"content\": \"This is an example\",\n    \"language\": \"Plain Text\",\n    \"createdAt\": \"2020-09-09T21:21:47.647Z\",\n    \"expiresAt\": \"2020-09-09T21:31:47.649Z\"\n}",
          "type": "js"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Unique name of paste</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "language",
            "description": "<p>Select one from : <code>[&quot;clike&quot;, &quot;python&quot;, &quot;json&quot;, &quot;Plain Text&quot;]</code></p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Content for paste</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "expiresInMinutes",
            "description": "<p>Minutes in which paste should expire</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "https://mitbin.herokuapp.com/api/paste"
      }
    ],
    "error": {
      "fields": {
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Incomplete or incompatible data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Name not unique",
          "content": "HTTP/1.0  Not Found\n{\n  \"error\": \"Name already exists!\"\n}",
          "type": "json"
        },
        {
          "title": "Paramaters are missing or wrong",
          "content": "HTTP/1.0  Not Found\n{\n  \"error\": \"Please pass all the required parameters correctly!\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "routes/api.js",
    "groupTitle": "Paste"
  },
  {
    "type": "get",
    "url": "/paste",
    "title": "Get Paste",
    "name": "GetPasteFromName",
    "group": "Paste",
    "description": "<p>Get paste from name if it exists</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "paste",
            "description": "<p>Single paste object if it exists, else empty array</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.0 200 OK\n[\n    {\n        \"name\": \"about\",\n        \"language\": \"Plain Text\",\n        \"content\": \"I am Mithil, a programming enthusiast. I am new to nodejs, and this is my first project! 😉\\r\\n\\r\\nDo tell me your feedback, I would be glad to hear from you!\",\n        \"createdAt\": \"2020-09-09T11:23:10.105Z\",\n        \"expiresAt\": \"2025-09-09T11:53:10.106Z\"\n    }\n]",
          "type": "js"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Unique name of paste</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "https://mitbin.herokuapp.com/api/paste"
      }
    ],
    "version": "0.1.0",
    "filename": "routes/api.js",
    "groupTitle": "Paste"
  }
] });