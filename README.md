light-typedclojure
==================
Typed Clojure plugin for Light Table

Currently in α; see [below](#prerelease-caveats) for existing issues.

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
to check the variable or form under the cursor, or in the selection.

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
Error messages are currently displayed in a rather awkward fashion, particularly for var/form checks. While this is partly due to the lack of a pre-existing eval-and-return method à la CIDER, there exists a Light Table bug in the display of inline results containing newlines that causes the widget to be moved within the editor (or even outside the editor, causing an error).

The annotation formatters do not reposition your cursor properly (again, a eval-and-return method would be welcome); for the form annotator, you are required to be *within* a form rather than at its boundaries.
