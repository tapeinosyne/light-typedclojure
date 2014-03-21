light-typedclojure
==================
Official Typed Clojure plugin for Light Table

## Installation
Typed Clojure is available in the plugin manager.

Alternatively, you can manually clone this repository into your plugin folder.

### Dependencies
Light Table 0.6.4+  
Clojure plugin 0.0.10+  
Paredit plugin 0.0.4+

Your project should include `[org.clojure/core.typed "0.2.30"]` or above.

## Usage
The following commands are currently available:

`Typed Clojure: check namespace`  
to typecheck the namespace defined in your current file (as saved on disk).

`Typed Clojure: check var or form`  
to typecheck the variable or form under the cursor, or in the selection.

`Typed Clojure: annotate var`  
to annotate a var with a type through `clojure.core.typed/ann`, fully qualifying it if necessary.

`Typed Clojure: annotate form`  
to annotate a form or symbol with a type through `clojure.core.typed/ann-form`.

To bind keys to any of these functions, add any of the following commands to your user.keymap:  
```clojure
{:+ {:editor.clj {"keybinding" [:typedclojure.check.ns]
                  "keybinding" [:typedclojure.check.form]
                  "keybinding" [:typedclojure.ann.var]
                  "keybinding" [:typedclojure.ann.form]}}}
```
