import json
import os
from typing import Dict
from elasticsearch import Elasticsearch

class SearchMemeBox():

    def __init__(self):

        self.es_client = Elasticsearch()
    
    def create_index(self,index_name,mapping):
        """
        Create an index 
        index_name : str
        mapping : dict
        """
        try:
            self.es_client.indices.create(index=index_name,ignore=400,body=mapping)
        except:
            raise "Error creating index"

    def insert_index(self,index_name,post):
        """
        Insert a post into the index

        index_name : (str) name of the index
        post : (dict) 
        """
        try:
            self.es_client.index(index=index_name,body = json.dumps(post))
        except:
            raise "Error inserting post"

    def search_index(self,index_name,query):
        """
        Search for a query in the index

        index_name : (str) name of the index
        """
        try:
            self.es_client.search(index = index_name,query = query)
        except:
            raise "Error searching the query"