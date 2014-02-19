light-typedclojure
==================
Typed Clojure plugin for Light Table

This is α software; see [below](#prerelease-caveats) for existing issues.

## Installation
Typed Clojure is available in the plugin manager.

Alternatively, you can manually clone this repository and either:  
- place it within Light Table's plugin folder, or
- simply eval the contents of Typed_Clojure/src/lt/plugins/typedclojure.cljs, for testing purposes.

### Dependencies
Light Table 0.6.4  
Paredit 0.0.4

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

## Prerelease caveats
Typecheck messages are currently displayed in a rather awkward fashion, particularly for var/form checks. While this is partly attributable to the lack of a pre-existing eval-and-return method à la CIDER, there exists a Light Table bug in the inline display of results containing newlines that causes the widget to be moved within the editor (or even outside the editor, causing an error). See [LightTable/LightTable#1298](https://github.com/LightTable/LightTable/issues/1298) for details.

The annotation commands do not reposition your cursor properly (again, a eval-and-return method would be welcome); they may also behave goofily or fail if the cursor is at a form boundary or in whitespace.
