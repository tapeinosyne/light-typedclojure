light-typedclojure
==================
Typed Clojure plugin for Light Table

Currently in pre-α.

## Installation
For testing purposes, either
- clone the current repository in your Light Table plugin folder, or
- clone the current repository and eval src/lt/plugins/typedclojure.cljs

### Dependencies
Light Table 0.6.4  
Paredit 0.0.4

Your project should include `[org.clojure/core.typed "0.2.30"]`.

## Usage
The following commands are currently available:

`Typed Clojure: check namespace`  
to typecheck the namespace defined in your current file (as saved on disk).

`Typed Clojure: check var or form`  
to check the variable or form under the cursor.

`Typed Clojure: annotate var`  
to annotate a var with a type.

`Typed Clojure: annotate form`  
to annotate a form with a type.

To bind keys to any of these functions, add the following commands to your user.keymap
```clojure
{:+ {:editor.clj {"keybinding" [:typedclojure.check.ns]
                  "keybinding" [:typedclojure.check.form]
                  "keybinding" [:typedclojure.ann.var]
                  "keybinding" [:typedclojure.ann.form]}}}
```

## Prerelease caveats
Error messages are currently displayed awkwardly, particularly for namespace checks.  
The annotation formatters do not reposition your cursor properly; for the form annotator, you are required to be *within* a form rather than at its boundaries.
