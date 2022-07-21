// HTTP Status Code.
export const statusCode = {
   100: {code: 100, reason: "Continue"}, // Informational 1xx
   101: {code: 101, reason: "Switching Protocols"},
   200: {code: 200, reason: "OK"}, // Successful 2xx
   201: {code: 201, reason: "Created"},
   202: {code: 202, reason: "Accepted"},
   203: {code: 203, reason: "Non-Authoritative Information"},
   204: {code: 204, reason: "No Content"},
   205: {code: 205, reason: "Reset Content"},
   206: {code: 206, reason: "Partial Content"},
   300: {code: 300, reason: "Multiple Choices"}, // Redirection 3xx
   301: {code: 301, reason: "Moved Permanently"},
   302: {code: 302, reason: "Found"},
   303: {code: 303, reason: "See Other"},
   304: {code: 304, reason: "Not Modified"},
   305: {code: 305, reason: "Use Proxy"},
   307: {code: 307, reason: "Temporary Redirect"},
   400: {code: 400, reason: "Bad Request"}, // Client Error 4xx
   401: {code: 401, reason: "Unauthorized"},
   402: {code: 402, reason: "Payment Required"},
   403: {code: 403, reason: "Forbidden"},
   404: {code: 404, reason: "Not Found"},
   405: {code: 405, reason: "Method Not Allowed"},
   406: {code: 406, reason: "Not Acceptable"},
   407: {code: 407, reason: "Proxy Authentication Required"},
   408: {code: 408, reason: "Request Timeout"},
   409: {code: 409, reason: "Conflict"},
   410: {code: 410, reason: "Gone"},
   411: {code: 411, reason: "Length Required"},
   412: {code: 412, reason: "Precondition Failed"},
   413: {code: 413, reason: "Payload Too Large"},
   414: {code: 414, reason: "URI Too Long"},
   415: {code: 415, reason: "Unsupported Media Type"},
   416: {code: 416, reason: "Range Not Satisfiable"},
   417: {code: 417, reason: "Expectation Failed"},
   426: {code: 426, reason: "Upgrade Required"},
   500: {code: 500, reason: "Internal Server Error"}, // Server Error 5xx
   501: {code: 501, reason: "Not Implemented"},
   502: {code: 502, reason: "Bad Gateway"},
   503: {code: 503, reason: "Service Unavailable"},
   504: {code: 504, reason: "Gateway Timeout"},
   505: {code: 505, reason: "HTTP Version Not Supported"},
   CONTINUE: {code: 100, reason: "Continue"}, // Informational 1xx
   SWITCHING_PROTOCOLS: {code: 101, reason: "Switching Protocols"},
   OK: {code: 200, reason: "OK"}, // Successful 2xx
   CREATED: {code: 201, reason: "Created"},
   ACCEPTED: {code: 202, reason: "Accepted"},
   NON_AUTHORITATIVE_INFORMATION: {code: 203, reason: "Non-Authoritative Information"},
   NO_CONTENT: {code: 204, reason: "No Content"},
   RESET_CONTENT: {code: 205, reason: "Reset Content"},
   PARTIAL_CONTENT: {code: 206, reason: "Partial Content"},
   MULTIPLE_CHOICES: {code: 300, reason: "Multiple Choices"}, // Redirection 3xx
   MOVED_PERMANENTLY: {code: 301, reason: "Moved Permanently"},
   FOUND: {code: 302, reason: "Found"},
   SEE_OTHER: {code: 303, reason: "See Other"},
   NOT_MODIFIED: {code: 304, reason: "Not Modified"},
   USE_PROXY: {code: 305, reason: "Use Proxy"},
   TEMPORARY_REDIRECT: {code: 307, reason: "Temporary Redirect"},
   BAD_REQUEST: {code: 400, reason: "Bad Request"}, // Client Error 4xx
   UNAUTHORIZED: {code: 401, reason: "Unauthorized"},
   PAYMENT_REQUIRED: {code: 402, reason: "Payment Required"},
   FORBIDDEN: {code: 403, reason: "Forbidden"},
   NOT_FOUND: {code: 404, reason: "Not Found"},
   METHOD_NOT_ALLOWED: {code: 405, reason: "Method Not Allowed"},
   NOT_ACCEPTABLE: {code: 406, reason: "Not Acceptable"},
   PROXY_AUTHENTICATION_REQUIRED: {code: 407, reason: "Proxy Authentication Required"},
   REQUEST_TIMEOUT: {code: 408, reason: "Request Timeout"},
   CONFLICT: {code: 409, reason: "Conflict"},
   GONE: {code: 410, reason: "Gone"},
   LENGTH_REQUIRED: {code: 411, reason: "Length Required"},
   PRECONDITION_FAILED: {code: 412, reason: "Precondition Failed"},
   PAYLOAD_TOO_LARGE: {code: 413, reason: "Payload Too Large"},
   URI_TOO_LONG: {code: 414, reason: "URI Too Long"},
   UNSUPPORTED_MEDIA_TYPE: {code: 415, reason: "Unsupported Media Type"},
   RANGE_NOT_SATISFIABLE: {code: 416, reason: "Range Not Satisfiable"},
   EXPECTATION_FAILED: {code: 417, reason: "Expectation Failed"},
   UPGRADE_REQUIRED: {code: 426, reason: "Upgrade Required"},
   INTERNAL_SERVER_ERROR: {code: 500, reason: "Internal Server Error"}, // Server Error 5xx
   NOT_IMPLEMENTED: {code: 501, reason: "Not Implemented"},
   BAD_GATEWAY: {code: 502, reason: "Bad Gateway"},
   SERVICE_UNAVAILABLE: {code: 503, reason: "Service Unavailable"},
   GATEWAY_TIMEOUT: {code: 504, reason: "Gateway Timeout"},
   HTTP_VERSION_NOT_SUPPORTED: {code: 505, reason: "HTTP Version Not Supported"}
}

// MIME Types.
export const mimeType = {
   "": "text/plain",
   ".aac": "audio/aac",                                                                  // AAC audio
   ".abw": "application/x-abiword",                                                      // AbiWord document
   ".arc": "application/octet-stream",                                                   // Archive document (multiple files embedded)
   ".avi": "video/x-msvideo",                                                            // Audio Video Interleave (AVI)
   ".azw": "application/vnd.amazon.ebook",                                               // Amazon Kindle eBook format
   ".bin": "application/octet-stream",                                                   // Any kind of binary data
   ".bmp": "image/bmp",                                                                  // Windows Bitmap Graphics
   ".bz": "application/x-bzip",                                                          // BZip archive
   ".bz2": "application/x-bzip2",                                                        // BZip2 archive
   ".csh": "application/x-csh",                                                          // C-Shell script
   ".css": "text/css",                                                                   // Cascading Style Sheets (CSS)
   ".csv": "text/csv",                                                                   // Comma-Separated Values (CSV)
   ".doc": "application/msword",                                                         // Microsoft Word
   ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",   // Microsoft Word (OpenXML)
   ".eot": "application/vnd.ms-fontobject",                                              // MS Embedded OpenType fonts
   ".epub": "application/epub+zip",                                                      // Electronic publication (EPUB)
   ".gz": "application/gzip",                                                            // GZip compressed archive
   ".gif": "image/gif",                                                                  // Graphics Interchange Format (GIF)
   ".htm": "text/html",                                                                  // HyperText Markup Language (HTML)
   ".html": "text/html",                                                                 // HyperText Markup Language (HTML)
   ".ico": "image/x-icon",                                                               // Icon format
   ".ics": "text/calendar",                                                              // iCalendar format
   ".jpeg": "image/jpeg",                                                                // JPEG images
   ".jpg": "image/jpeg",                                                                 // JPEG images
   ".js": "text/javascript",                                                             // JavaScript (ECMAScript)
   ".json": "application/json",                                                          // JSON format
   ".jsonld": "application/ld+json",                                                     // JSON-LD format
   ".mid": "audio/midi",                                                                 // Musical Instrument Digital Interface (MIDI)
   ".midi": "audio/midi",                                                                // Musical Instrument Digital Interface (MIDI)
   ".mjs": "text/javascript",                                                            // JavaScript module
   ".mp3": "audio/mpeg",                                                                 // MP3 audio
   ".mp4": "video/mp4",                                                                  // MP4 video (audio/mp4 if it doesn't contain video)
   ".mpeg": "video/mpeg",                                                                // MPEG video
   ".mpkg": "application/vnd.apple.installer+xml",                                       // Apple Installer Package
   ".odp": "application/vnd.oasis.opendocument.presentation",                            // OpenDocument presentation document
   ".ods": "application/vnd.oasis.opendocument.spreadsheet",                             // OpenDocument spreadsheet document
   ".odt": "application/vnd.oasis.opendocument.text",                                    // OpenDocument text document
   ".oga": "audio/ogg",                                                                  // OGG audio
   ".ogv": "video/ogg",                                                                  // OGG video
   ".ogx": "application/ogg",                                                            // OGG
   ".otf": "font/otf",                                                                   // OpenType Font
   ".png": "image/png",                                                                  // Portable Network Graphics (PNG)
   ".pdf": "application/pdf",                                                            // Adobe Portable Document Format (PDF)
   ".ppt": "application/vnd.ms-powerpoint",                                              // Microsoft PowerPoint
   ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation", // Microsoft PowerPoint (OpenXML)
   ".rar": "application/x-rar-compressed",                                               // RAR archive
   ".rtf": "application/rtf",                                                            // Rich Text Format (RTF)
   ".sh": "application/x-sh",                                                            // Bourne shell script
   ".svg": "image/svg+xml",                                                              // Scalable Vector Graphics (SVG)
   ".swf": "application/x-shockwave-flash",                                              // Small Web Format (SWF) or Adobe Flash document
   ".tar": "application/x-tar",                                                          // Tape archive (TAR)
   ".tif": "image/tiff",                                                                 // Tagged Image File Format (TIFF)
   ".tiff": "image/tiff",                                                                // Tagged Image File Format (TIFF)
   ".ts": "video/mp2t",                                                                  // MPEG transport stream
   ".ttf": "font/ttf",                                                                   // TrueType Font
   ".txt": "text/plain",                                                                 // Text (ASCII, UTF-8 or ISO 8859-n)
   ".vsd": "application/vnd.visio",                                                      // Microsoft Visio
   ".wav": "audio/wav",                                                                  // Waveform Audio Format
   ".weba": "audio/webm",                                                                // WEBM audio
   ".webm": "video/webm",                                                                // WEBM video (media)
   ".webp": "image/webp",                                                                // WEBP image (picture)
   ".woff": "font/woff",                                                                 // Web Open Font Format (WOFF)
   ".woff2": "font/woff2",                                                               // Web Open Font Format (WOFF)
   ".xhtml": "application/xhtml+xml",                                                    // Extensible Hypertext Markup Language (XHTML)
   ".xls": "application/vnd.ms-excel",                                                   // Microsoft Excel
   ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",         // Microsoft Excel (OpenXML)
   ".xml": "application/xml",                                                            // Extensible Markup Language (XML)
   ".xul": "application/vnd.mozilla.xul+xml",                                            // XUL
   ".zip": "application/zip",                                                            // ZIP archive
   ".3gp": "video/3gpp",                                                                 // 3GPP audio/video container (audio/3gpp if it doesn't contain video)
   ".3g2": "video/3gpp2",                                                                // 3GPP2 audio/video container (audio/3gpp2 if it doesn't contain video)
   ".7z": "application/x-7z-compressed"                                                  // 7-zip archive
}