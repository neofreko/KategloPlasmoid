# -*- coding: utf-8 -*-
#
# Copyright 2009 Akhmad Fathonih <akhmadf@gmail.com>
# GPL
# Using yql module: http://python-yql.org/

from PyQt4.QtCore import *
from PyKDE4.kdecore import *
from PyKDE4 import plasmascript
import yql

class PyYqlEngine(plasmascript.DataEngine):
    def __init__(self,parent,args=None):
        plasmascript.DataEngine.__init__(self,parent)        

    def init(self):
        pass #self.setMinimumPollingInterval(333)

    #def sources(self):
    #    sources = ["onemanga"]
    #    return sources
    
    def sourceRequestEvent(self, name):
        return self.updateSourceEvent(name)

    def updateSourceEvent(self, query):
        y = yql.Public()
        #res = y.execute("use 'http://yqlblog.net/samples/search.imageweb.xml' as searchimageweb; select title from searchimageweb where query='pizza' limit 3")
        res = y.execute("select * from xml where url = 'http://bahtera.org/kateglo/api.php?format=xml&phrase=%s'" % query)
        
        if (res['query']['results']):
          self.setData(query, 'status', res['query']['results']['kateglo']['status'])
          self.setData(query, 'phrase', res['query']['results']['kateglo']['phrase'])
          self.setData(query, 'lex_class', res['query']['results']['kateglo']['lex_class'])
          self.setData(query, 'definition', res['query']['results']['kateglo']['definition'])
        else:
          self.setData(query, 'status', 0)          
        
        return True

def CreateDataEngine(parent):
    return PyYqlEngine(parent)