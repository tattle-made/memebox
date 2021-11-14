post_mapping = {
    "mappings" : {
        "properties": {
            "title" : {"type":"text"},
            "platform" : {"type":"text"},
            "tags" : {"type": "text"},
            "annotation" : {"type": "flattened"},
            "platform_metadata" : {"type" : "flattened"}
        }
    }
}