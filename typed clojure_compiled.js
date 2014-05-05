if(!lt.util.load.provided_QMARK_('lt.plugins.typedclojure.cursor')) {
goog.provide('lt.plugins.typedclojure.cursor');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.plugins.paredit');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('lt.plugins.paredit');
goog.require('lt.objs.command');
goog.require('lt.objs.editor');
goog.require('lt.object');
lt.plugins.typedclojure.cursor.post_ann_boundary = (function post_ann_boundary(editor,bound){var loc = lt.objs.editor.adjust_loc.call(null,lt.objs.editor.__GT_cursor.call(null,editor),-1);var vec__8392 = lt.plugins.paredit.form_boundary.call(null,editor,loc,null);var start = cljs.core.nth.call(null,vec__8392,0,null);var end = cljs.core.nth.call(null,vec__8392,1,null);if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"start","start",1123661780),bound))
{return start;
} else
{return end;
}
});
/**
* Given an editor, a cursor, and a location offset {:line n :ch m}, move
* the cursor to a new location.
*/
lt.plugins.typedclojure.cursor.move_relative = (function move_relative(e,cursor,p__8393){var map__8395 = p__8393;var map__8395__$1 = ((cljs.core.seq_QMARK_.call(null,map__8395))?cljs.core.apply.call(null,cljs.core.hash_map,map__8395):map__8395);var offset = map__8395__$1;var ch = cljs.core.get.call(null,map__8395__$1,new cljs.core.Keyword(null,"ch","ch",1013907415));var line = cljs.core.get.call(null,map__8395__$1,new cljs.core.Keyword(null,"line","line",1017226086));var new_pos = cljs.core.merge_with.call(null,cljs.core._PLUS_,cursor,offset);return lt.objs.editor.move_cursor.call(null,e,new_pos);
});
/**
* Given an editor, a location, and a vector of integers [start end], sets
* the selection from column (location + start) to column (location + end)
*/
lt.plugins.typedclojure.cursor.select_relative_STAR_ = (function select_relative_STAR_(e,loc,p__8396){var vec__8398 = p__8396;var start = cljs.core.nth.call(null,vec__8398,0,null);var end = cljs.core.nth.call(null,vec__8398,1,null);return lt.objs.editor.set_selection.call(null,e,lt.objs.editor.adjust_loc.call(null,loc,start),lt.objs.editor.adjust_loc.call(null,loc,end));
});
lt.plugins.typedclojure.cursor.select_relative = (function select_relative(p__8399){var map__8401 = p__8399;var map__8401__$1 = ((cljs.core.seq_QMARK_.call(null,map__8401))?cljs.core.apply.call(null,cljs.core.hash_map,map__8401):map__8401);var rel = cljs.core.get.call(null,map__8401__$1,new cljs.core.Keyword(null,"rel","rel",1014017035),new cljs.core.Keyword(null,"end","end",1014004813));var sel = cljs.core.get.call(null,map__8401__$1,new cljs.core.Keyword(null,"sel","sel",1014017996),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [0,-3], null));var editor = cljs.core.get.call(null,map__8401__$1,new cljs.core.Keyword(null,"editor","editor",4001043679));var loc = lt.plugins.typedclojure.cursor.post_ann_boundary.call(null,editor,rel);return lt.plugins.typedclojure.cursor.select_relative_STAR_.call(null,editor,loc,sel);
});
lt.plugins.typedclojure.cursor.__GT_newline_above_BANG_ = (function __GT_newline_above_BANG_(e,loc){lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"typedclojure.pseudoparedit.top","typedclojure.pseudoparedit.top",1462061138));
lt.objs.editor.insert_at_cursor.call(null,e,"\n");
return lt.objs.editor.move_cursor.call(null,e,loc);
});
lt.plugins.typedclojure.cursor.seek_top = (function seek_top(ed,loc){var loc__$1 = loc;while(true){
var pars = cljs.core.re_pattern.call(null,"\\(|\\{|\\[");var cur = cljs.core.second.call(null,lt.plugins.paredit.scan.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"loc","loc",1014011570),loc__$1,new cljs.core.Keyword(null,"dir","dir",1014003711),new cljs.core.Keyword(null,"left","left",1017222009),new cljs.core.Keyword(null,"regex","regex",1122296761),pars,new cljs.core.Keyword(null,"skip","skip",1017436401),lt.plugins.paredit.in_string_QMARK_], null)));var adj = lt.objs.editor.adjust_loc.call(null,cur,-1);if(((new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(cur) === 0)) || ((new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(cur) == null)))
{return cur;
} else
{{
var G__8407 = adj;
loc__$1 = G__8407;
continue;
}
}
break;
}
});
lt.plugins.typedclojure.cursor.seek_bottom = (function seek_bottom(ed,loc){var __GT_top = (function (pos){return lt.objs.editor.adjust_loc.call(null,pos,1);
});var start = lt.plugins.typedclojure.cursor.seek_top.call(null,ed,loc);var end = cljs.core.second.call(null,lt.plugins.paredit.form_boundary.call(null,ed,__GT_top.call(null,start),null));return __GT_top.call(null,end);
});
lt.plugins.typedclojure.cursor.move_top = (function move_top(p__8402,dir){var map__8405 = p__8402;var map__8405__$1 = ((cljs.core.seq_QMARK_.call(null,map__8405))?cljs.core.apply.call(null,cljs.core.hash_map,map__8405):map__8405);var orig = map__8405__$1;var loc = cljs.core.get.call(null,map__8405__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__8405__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var vec__8406 = lt.plugins.paredit.form_boundary.call(null,ed,loc,null);var start = cljs.core.nth.call(null,vec__8406,0,null);var end = cljs.core.nth.call(null,vec__8406,1,null);if(cljs.core.truth_((function (){var and__6801__auto__ = start;if(cljs.core.truth_(and__6801__auto__))
{return end;
} else
{return and__6801__auto__;
}
})()))
{var dest = ((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"right","right",1122416014)))?lt.plugins.typedclojure.cursor.seek_bottom.call(null,ed,loc):lt.plugins.typedclojure.cursor.seek_top.call(null,ed,loc));return cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"cursor","cursor",3959752392),new cljs.core.Keyword(null,"from","from",1017056028),dest,new cljs.core.Keyword(null,"to","to",1013907949),dest], null));
} else
{return orig;
}
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"typedclojure.pseudoparedit.top","typedclojure.pseudoparedit.top",1462061138),new cljs.core.Keyword(null,"desc","desc",1016984067),"Typed Clojure: move cursor to top level",new cljs.core.Keyword(null,"hidden","hidden",4091384092),true,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){var temp__4126__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4126__auto__))
{var ed = temp__4126__auto__;if(cljs.core.truth_((function (){var or__6813__auto__ = cljs.core.not.call(null,new cljs.core.Keyword("lt.plugins.typedclojure.cursor","orig-pos","lt.plugins.typedclojure.cursor/orig-pos",1692537433).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));if(or__6813__auto__)
{return or__6813__auto__;
} else
{return lt.objs.editor.selection_QMARK_.call(null,ed);
}
})()))
{lt.object.merge_BANG_.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.typedclojure.cursor","orig-pos","lt.plugins.typedclojure.cursor/orig-pos",1692537433),lt.objs.editor.__GT_cursor.call(null,ed)], null));
} else
{}
return lt.plugins.paredit.batched_edits.call(null,lt.plugins.typedclojure.cursor.move_top.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),new cljs.core.Keyword(null,"left","left",1017222009)));
} else
{return null;
}
})], null));
}
if(!lt.util.load.provided_QMARK_('lt.plugins.typedclojure.token')) {
goog.provide('lt.plugins.typedclojure.token');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('clojure.string');
goog.require('lt.objs.editor');
goog.require('lt.objs.editor');
lt.plugins.typedclojure.token.__GT_token = (function __GT_token(e,loc){var opening_QMARK_ = (function (p1__8408_SHARP_){return (cljs.core._EQ_.call(null,"(",p1__8408_SHARP_)) || (cljs.core._EQ_.call(null,"[",p1__8408_SHARP_)) || (cljs.core._EQ_.call(null,"{",p1__8408_SHARP_));
});var closing_QMARK_ = ((function (opening_QMARK_){
return (function (p1__8409_SHARP_){return (cljs.core._EQ_.call(null,")",p1__8409_SHARP_)) || (cljs.core._EQ_.call(null,"]",p1__8409_SHARP_)) || (cljs.core._EQ_.call(null,"}",p1__8409_SHARP_));
});})(opening_QMARK_))
;var token_str = ((function (opening_QMARK_,closing_QMARK_){
return (function (pos){return new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_token.call(null,e,pos));
});})(opening_QMARK_,closing_QMARK_))
;var __GT_bound = ((function (opening_QMARK_,closing_QMARK_,token_str){
return (function (n){return lt.objs.editor.adjust_loc.call(null,loc,n);
});})(opening_QMARK_,closing_QMARK_,token_str))
;var s = token_str.call(null,loc);if(closing_QMARK_.call(null,s))
{return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"at","at",1013907365),__GT_bound.call(null,-1),new cljs.core.Keyword(null,"boundary","boundary",3193559964),true], null);
} else
{if(opening_QMARK_.call(null,s))
{return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"at","at",1013907365),__GT_bound.call(null,1),new cljs.core.Keyword(null,"boundary","boundary",3193559964),true], null);
} else
{if(cljs.core._EQ_.call(null," ",s))
{return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"at","at",1013907365),loc,new cljs.core.Keyword(null,"whitespace","whitespace",1290815983),true], null);
} else
{if(cljs.core.empty_QMARK_.call(null,s))
{var tkn = token_str.call(null,__GT_bound.call(null,1));if(cljs.core.truth_(clojure.string.blank_QMARK_.call(null,tkn)))
{return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"at","at",1013907365),loc,new cljs.core.Keyword(null,"orphan","orphan",4300461050),true], null);
} else
{if(opening_QMARK_.call(null,tkn))
{return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"at","at",1013907365),__GT_bound.call(null,1),new cljs.core.Keyword(null,"boundary","boundary",3193559964),true], null);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"at","at",1013907365),loc,new cljs.core.Keyword(null,"string","string",4416885635),tkn], null);
} else
{return null;
}
}
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"at","at",1013907365),loc,new cljs.core.Keyword(null,"string","string",4416885635),s], null);
} else
{return null;
}
}
}
}
}
});
lt.plugins.typedclojure.token.bounds = (function bounds(e,loc){var token = lt.objs.editor.__GT_token.call(null,e,loc);var ln = new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),ln,new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(token)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),ln,new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end","end",1014004813).cljs$core$IFn$_invoke$arity$1(token)], null)], null);
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.typedclojure')) {
goog.provide('lt.plugins.typedclojure');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.notifos');
goog.require('lt.plugins.paredit');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.objs.editor.pool');
goog.require('lt.plugins.typedclojure.token');
goog.require('lt.objs.editor.pool');
goog.require('lt.plugins.paredit');
goog.require('lt.objs.command');
goog.require('lt.plugins.typedclojure.cursor');
goog.require('lt.objs.editor');
goog.require('lt.plugins.typedclojure.cursor');
goog.require('lt.plugins.typedclojure.token');
goog.require('lt.objs.notifos');
goog.require('cljs.reader');
goog.require('cljs.reader');
goog.require('lt.object');
lt.plugins.typedclojure.typed_alias = cljs.core.list(new cljs.core.Symbol(null,"if-let","if-let",1461176100,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"a","a",-1640531430,null),new cljs.core.Symbol(null,"typedns","typedns",1801350504,null)], null),cljs.core.list(new cljs.core.Symbol(null,"first","first",-1543091095,null),cljs.core.list(new cljs.core.Symbol(null,"filter","filter",1379943729,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-1640430053,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p1__8323#","p1__8323#",-1527048673,null)], null),cljs.core.list(new cljs.core.Symbol(null,"=","=",-1640531466,null),cljs.core.list(new cljs.core.Symbol(null,"find-ns","find-ns",1801204754,null),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",-1532577739,null),new cljs.core.Symbol(null,"clojure.core.typed","clojure.core.typed",546418782,null))),cljs.core.list(new cljs.core.Symbol(null,"val","val",-1640415014,null),new cljs.core.Symbol(null,"p1__8323#","p1__8323#",-1527048673,null)))),cljs.core.list(new cljs.core.Symbol(null,"ns-aliases","ns-aliases",1016472751,null),new cljs.core.Symbol(null,"*ns*","*ns*",-1639170988,null))))], null),cljs.core.list(new cljs.core.Symbol(null,"str","str",-1640417302,null),new cljs.core.Symbol(null,"a","a",-1640531430,null),"/"),cljs.core.list(new cljs.core.Symbol(null,"str","str",-1640417302,null),"clojure.core.typed/"));
lt.plugins.typedclojure.aliased_LT__ = (function aliased_LT__(f){return [cljs.core.str(lt.plugins.typedclojure.typed_alias),cljs.core.str(" "),cljs.core.str(cljs.core.pr_str.call(null,f))].join('');
});
lt.plugins.typedclojure.qualified_LT__ = (function qualified_LT__(var$){return [cljs.core.str("\n   (let [s '"),cljs.core.str(var$),cljs.core.str("\n         ^clojure.lang.Var v (when (symbol? s) (resolve s))]\n     (cond\n      (not (var? v)) (when (symbol? s) (str s))\n      (not= *ns* (.ns v)) (str \"^:no-check \"\n                               (symbol (str (ns-name (.ns v)))\n                                       (str (.sym v))))\n      :else (str (name (symbol s)))))")].join('');
});
/**
* @param {...*} var_args
*/
lt.plugins.typedclojure.raise_STAR_ = (function() { 
var raise_STAR___delegate = function (e,fun_string,p__8324){var map__8326 = p__8324;var map__8326__$1 = ((cljs.core.seq_QMARK_.call(null,map__8326))?cljs.core.apply.call(null,cljs.core.hash_map,map__8326):map__8326);var res = cljs.core.get.call(null,map__8326__$1,new cljs.core.Keyword(null,"res","res",1014017042),new cljs.core.Keyword(null,"replace","replace",2108401190));return lt.object.raise.call(null,e,new cljs.core.Keyword(null,"eval.custom","eval.custom",3328560245),fun_string,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"result-type","result-type",4725630556),res,new cljs.core.Keyword(null,"verbatim","verbatim",3307884968),true], null));
};
var raise_STAR_ = function (e,fun_string,var_args){
var p__8324 = null;if (arguments.length > 2) {
  p__8324 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return raise_STAR___delegate.call(this,e,fun_string,p__8324);};
raise_STAR_.cljs$lang$maxFixedArity = 2;
raise_STAR_.cljs$lang$applyTo = (function (arglist__8349){
var e = cljs.core.first(arglist__8349);
arglist__8349 = cljs.core.next(arglist__8349);
var fun_string = cljs.core.first(arglist__8349);
var p__8324 = cljs.core.rest(arglist__8349);
return raise_STAR___delegate(e,fun_string,p__8324);
});
raise_STAR_.cljs$core$IFn$_invoke$arity$variadic = raise_STAR___delegate;
return raise_STAR_;
})()
;
/**
* @param {...*} var_args
*/
lt.plugins.typedclojure.raise_ann = (function() { 
var raise_ann__delegate = function (e,fun_string,p__8327){var vec__8329 = p__8327;var opts = cljs.core.nth.call(null,vec__8329,0,null);return lt.object.raise.call(null,e,new cljs.core.Keyword(null,"eval.custom","eval.custom",3328560245),fun_string,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"result-type","result-type",4725630556),new cljs.core.Keyword(null,"return","return",4374474914),new cljs.core.Keyword(null,"handler","handler",1706707644),e,new cljs.core.Keyword(null,"trigger","trigger",4248979754),new cljs.core.Keyword("lt.plugins.typedclojure","annotate!","lt.plugins.typedclojure/annotate!",3609102528)], null),opts));
};
var raise_ann = function (e,fun_string,var_args){
var p__8327 = null;if (arguments.length > 2) {
  p__8327 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return raise_ann__delegate.call(this,e,fun_string,p__8327);};
raise_ann.cljs$lang$maxFixedArity = 2;
raise_ann.cljs$lang$applyTo = (function (arglist__8350){
var e = cljs.core.first(arglist__8350);
arglist__8350 = cljs.core.next(arglist__8350);
var fun_string = cljs.core.first(arglist__8350);
var p__8327 = cljs.core.rest(arglist__8350);
return raise_ann__delegate(e,fun_string,p__8327);
});
raise_ann.cljs$core$IFn$_invoke$arity$variadic = raise_ann__delegate;
return raise_ann;
})()
;
lt.plugins.typedclojure.__BEH__annotate_BANG_ = (function __BEH__annotate_BANG_(this$,p__8330){var map__8332 = p__8330;var map__8332__$1 = ((cljs.core.seq_QMARK_.call(null,map__8332))?cljs.core.apply.call(null,cljs.core.hash_map,map__8332):map__8332);var meta = cljs.core.get.call(null,map__8332__$1,new cljs.core.Keyword(null,"meta","meta",1017252215));var result = cljs.core.get.call(null,map__8332__$1,new cljs.core.Keyword(null,"result","result",4374444943));var returned = cljs.reader.read_string.call(null,result);lt.objs.editor.replace_selection.call(null,this$,returned);
return lt.plugins.typedclojure.cursor.select_relative.call(null,cljs.core.merge.call(null,meta,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor","editor",4001043679),this$], null)));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.typedclojure","annotate!","lt.plugins.typedclojure/annotate!",3609102528),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.typedclojure","annotate!","lt.plugins.typedclojure/annotate!",3609102528),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.typedclojure.__BEH__annotate_BANG_);
lt.plugins.typedclojure.__GT_ann_var = (function __GT_ann_var(token){return [cljs.core.str("(str \"(\""),cljs.core.str(lt.plugins.typedclojure.aliased_LT__.call(null,"ann")),cljs.core.str("\" \""),cljs.core.str((cljs.core.truth_(token)?lt.plugins.typedclojure.qualified_LT__.call(null,token):" ")),cljs.core.str("\" Any)\""),cljs.core.str(")")].join('');
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"typedclojure.ann.var","typedclojure.ann.var",3333302872),new cljs.core.Keyword(null,"desc","desc",1016984067),"Typed Clojure: annotate var",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var e = lt.objs.editor.pool.last_active.call(null);var c = lt.objs.editor.__GT_cursor.call(null,e);var token = (cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,e))?new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"string","string",4416885635),lt.objs.editor.selection.call(null,e)], null):lt.plugins.typedclojure.token.__GT_token.call(null,e,c));if(cljs.core.truth_((function (){var or__6813__auto__ = new cljs.core.Keyword(null,"boundary","boundary",3193559964).cljs$core$IFn$_invoke$arity$1(token);if(cljs.core.truth_(or__6813__auto__))
{return or__6813__auto__;
} else
{return new cljs.core.Keyword(null,"whitespace","whitespace",1290815983).cljs$core$IFn$_invoke$arity$1(token);
}
})()))
{return lt.objs.notifos.set_msg_BANG_.call(null,"core.typed/ann can only annotate vars");
} else
{if(cljs.core.truth_(new cljs.core.Keyword(null,"orphan","orphan",4300461050).cljs$core$IFn$_invoke$arity$1(token)))
{return lt.plugins.typedclojure.raise_ann.call(null,e,lt.plugins.typedclojure.__GT_ann_var.call(null,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sel","sel",1014017996),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [-4,-4], null)], null));
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{lt.plugins.typedclojure.cursor.__GT_newline_above_BANG_.call(null,e,c);
return lt.plugins.typedclojure.raise_ann.call(null,e,lt.plugins.typedclojure.__GT_ann_var.call(null,new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(token)));
} else
{return null;
}
}
}
})], null));
lt.plugins.typedclojure.__GT_ann_form = (function __GT_ann_form(s){return [cljs.core.str("(str \"(\""),cljs.core.str(lt.plugins.typedclojure.aliased_LT__.call(null,"ann-form")),cljs.core.str("\" \""),cljs.core.str((function (){var or__6813__auto__ = cljs.core.pr_str.call(null,s);if(cljs.core.truth_(or__6813__auto__))
{return or__6813__auto__;
} else
{return " ";
}
})()),cljs.core.str("\" Any)\""),cljs.core.str(")")].join('');
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"typedclojure.ann.form","typedclojure.ann.form",4195321943),new cljs.core.Keyword(null,"desc","desc",1016984067),"Typed Clojure: annotate form",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var e = lt.objs.editor.pool.last_active.call(null);var c = lt.objs.editor.__GT_cursor.call(null,e);var token = (cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,e))?new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"string","string",4416885635),lt.objs.editor.selection.call(null,e),new cljs.core.Keyword(null,"selection","selection",3592905982),true], null):lt.plugins.typedclojure.token.__GT_token.call(null,e,c));if(cljs.core.truth_(new cljs.core.Keyword(null,"boundary","boundary",3193559964).cljs$core$IFn$_invoke$arity$1(token)))
{lt.objs.editor.move_cursor.call(null,e,new cljs.core.Keyword(null,"at","at",1013907365).cljs$core$IFn$_invoke$arity$1(token));
lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"paredit.select.parent","paredit.select.parent",4454322891));
return lt.plugins.typedclojure.raise_ann.call(null,e,lt.plugins.typedclojure.__GT_ann_form.call(null,lt.objs.editor.selection.call(null,e)));
} else
{if(cljs.core.truth_(new cljs.core.Keyword(null,"whitespace","whitespace",1290815983).cljs$core$IFn$_invoke$arity$1(token)))
{lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"paredit.select.parent","paredit.select.parent",4454322891));
return lt.plugins.typedclojure.raise_ann.call(null,e,lt.plugins.typedclojure.__GT_ann_form.call(null,lt.objs.editor.selection.call(null,e)));
} else
{if(cljs.core.truth_(new cljs.core.Keyword(null,"orphan","orphan",4300461050).cljs$core$IFn$_invoke$arity$1(token)))
{return lt.plugins.typedclojure.raise_ann.call(null,e,lt.plugins.typedclojure.__GT_ann_form.call(null,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sel","sel",1014017996),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [-4,-4], null)], null));
} else
{if(cljs.core.truth_(new cljs.core.Keyword(null,"selection","selection",3592905982).cljs$core$IFn$_invoke$arity$1(token)))
{return lt.plugins.typedclojure.raise_ann.call(null,e,lt.plugins.typedclojure.__GT_ann_form.call(null,new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(token)));
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{var vec__8333 = lt.plugins.typedclojure.token.bounds.call(null,e,new cljs.core.Keyword(null,"at","at",1013907365).cljs$core$IFn$_invoke$arity$1(token));var start = cljs.core.nth.call(null,vec__8333,0,null);var end = cljs.core.nth.call(null,vec__8333,1,null);lt.objs.editor.set_selection.call(null,e,start,end);
return lt.plugins.typedclojure.raise_ann.call(null,e,lt.plugins.typedclojure.__GT_ann_form.call(null,new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(token)));
} else
{return null;
}
}
}
}
}
})], null));
/**
* @param {...*} var_args
*/
lt.plugins.typedclojure.__GT_pred = (function() { 
var __GT_pred__delegate = function (p__8334){var vec__8336 = p__8334;var s = cljs.core.nth.call(null,vec__8336,0,null);return [cljs.core.str("(str \"((\""),cljs.core.str(lt.plugins.typedclojure.aliased_LT__.call(null,"pred")),cljs.core.str("\" \""),cljs.core.str(cljs.core.pr_str.call(null,"Any")),cljs.core.str("\") \""),cljs.core.str((cljs.core.truth_(s)?cljs.core.pr_str.call(null,s):null)),cljs.core.str("\")\""),cljs.core.str(")")].join('');
};
var __GT_pred = function (var_args){
var p__8334 = null;if (arguments.length > 0) {
  p__8334 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return __GT_pred__delegate.call(this,p__8334);};
__GT_pred.cljs$lang$maxFixedArity = 0;
__GT_pred.cljs$lang$applyTo = (function (arglist__8351){
var p__8334 = cljs.core.seq(arglist__8351);
return __GT_pred__delegate(p__8334);
});
__GT_pred.cljs$core$IFn$_invoke$arity$variadic = __GT_pred__delegate;
return __GT_pred;
})()
;
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"typedclojure.pred","typedclojure.pred",3504968647),new cljs.core.Keyword(null,"desc","desc",1016984067),"Typed Clojure: add predicate",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var e = lt.objs.editor.pool.last_active.call(null);var c = lt.objs.editor.__GT_cursor.call(null,e);var token = (cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,e))?new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"string","string",4416885635),lt.objs.editor.selection.call(null,e),new cljs.core.Keyword(null,"selection","selection",3592905982),true], null):lt.plugins.typedclojure.token.__GT_token.call(null,e,c));var post_opts = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"rel","rel",1014017035),new cljs.core.Keyword(null,"start","start",1123661780),new cljs.core.Keyword(null,"sel","sel",1014017996),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [12,9], null)], null);if(cljs.core.truth_((function (){var or__6813__auto__ = new cljs.core.Keyword(null,"boundary","boundary",3193559964).cljs$core$IFn$_invoke$arity$1(token);if(cljs.core.truth_(or__6813__auto__))
{return or__6813__auto__;
} else
{return new cljs.core.Keyword(null,"whitespace","whitespace",1290815983).cljs$core$IFn$_invoke$arity$1(token);
}
})()))
{lt.objs.editor.move_cursor.call(null,e,new cljs.core.Keyword(null,"at","at",1013907365).cljs$core$IFn$_invoke$arity$1(token));
lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"paredit.select.parent","paredit.select.parent",4454322891));
return lt.plugins.typedclojure.raise_ann.call(null,e,lt.plugins.typedclojure.__GT_pred.call(null,lt.objs.editor.selection.call(null,e)),post_opts);
} else
{if(cljs.core.truth_(new cljs.core.Keyword(null,"orphan","orphan",4300461050).cljs$core$IFn$_invoke$arity$1(token)))
{return lt.plugins.typedclojure.raise_ann.call(null,e,lt.plugins.typedclojure.__GT_pred.call(null),post_opts);
} else
{if(cljs.core.truth_(new cljs.core.Keyword(null,"selection","selection",3592905982).cljs$core$IFn$_invoke$arity$1(token)))
{return lt.plugins.typedclojure.raise_ann.call(null,e,lt.plugins.typedclojure.__GT_pred.call(null,new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(token)),post_opts);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{var vec__8337 = lt.plugins.typedclojure.token.bounds.call(null,e,new cljs.core.Keyword(null,"at","at",1013907365).cljs$core$IFn$_invoke$arity$1(token));var start = cljs.core.nth.call(null,vec__8337,0,null);var end = cljs.core.nth.call(null,vec__8337,1,null);lt.objs.editor.set_selection.call(null,e,start,end);
return lt.plugins.typedclojure.raise_ann.call(null,e,lt.plugins.typedclojure.__GT_pred.call(null,new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(token)),post_opts);
} else
{return null;
}
}
}
}
})], null));
lt.plugins.typedclojure.ns_checker = [cljs.core.str(cljs.core.list(new cljs.core.Symbol(null,"let","let",-1640424492,null),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"t","t",-1640531411,null),cljs.core.list(new cljs.core.Symbol(null,"require","require",-544834786,null),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",-1532577739,null),new cljs.core.Symbol(null,"clojure.core.typed","clojure.core.typed",546418782,null))),new cljs.core.Symbol(null,"check-ns-info","check-ns-info",-290126422,null),cljs.core.list(new cljs.core.Symbol(null,"find-var","find-var",1974085324,null),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",-1532577739,null),new cljs.core.Symbol("clojure.core.typed","check-ns-info","clojure.core.typed/check-ns-info",-410842570,null))),new cljs.core.Symbol(null,"t","t",-1640531411,null),cljs.core.list(new cljs.core.Symbol(null,"assert","assert",1246227711,null),new cljs.core.Symbol(null,"check-ns-info","check-ns-info",-290126422,null),"clojure.core.typed/check-ns-info not found"),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keys","keys",1017192806),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"delayed-errors","delayed-errors",622784495,null)], null)], null),cljs.core.list(new cljs.core.Symbol(null,"check-ns-info","check-ns-info",-290126422,null))], null),cljs.core.list(new cljs.core.Symbol(null,"if-let","if-let",1461176100,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"res","res",-1640418727,null),cljs.core.list(new cljs.core.Symbol(null,"seq","seq",-1640417768,null),new cljs.core.Symbol(null,"delayed-errors","delayed-errors",622784495,null))], null),cljs.core.list(new cljs.core.Symbol(null,"do","do",-1640528316,null),cljs.core.list(new cljs.core.Symbol(null,"doseq","doseq",-1544758867,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"e","e",-1640531426,null),new cljs.core.Symbol(null,"res","res",-1640418727,null),new cljs.core.Keyword(null,"let","let",1014011277),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"keys","keys",1017192806),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"env","env",-1640430938,null)], null),new cljs.core.Keyword(null,"as","as",1013907364),new cljs.core.Symbol(null,"data","data",-1637455517,null)], null),cljs.core.list(new cljs.core.Symbol(null,"ex-data","ex-data",1283159613,null),new cljs.core.Symbol(null,"e","e",-1640531426,null))], null)], null),cljs.core.list(new cljs.core.Symbol(null,"println","println",-1955249496,null),cljs.core.list(new cljs.core.Symbol(null,"str","str",-1640417302,null),cljs.core.list(new cljs.core.Symbol(null,"first","first",-1543091095,null),cljs.core.list(new cljs.core.Symbol("clojure.string","split","clojure.string/split",1032860786,null),cljs.core.list(new cljs.core.Symbol(null,".getMessage",".getMessage",-704129992,null),new cljs.core.Symbol(null,"e","e",-1640531426,null)),/\nHint/)),"\n",cljs.core.list(new cljs.core.Symbol(null,"if","if",-1640528170,null),cljs.core.list(new cljs.core.Symbol(null,"contains?","contains?",-2051487815,null),new cljs.core.Symbol(null,"data","data",-1637455517,null),new cljs.core.Keyword(null,"form","form",1017053238)),cljs.core.list(new cljs.core.Keyword(null,"form","form",1017053238),new cljs.core.Symbol(null,"data","data",-1637455517,null)),0),"\n","Source: ",cljs.core.list(new cljs.core.Keyword(null,"source","source",4412365709),new cljs.core.Symbol(null,"env","env",-1640430938,null)),"  ","{line: ",cljs.core.list(new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Symbol(null,"env","env",-1640430938,null))," ","ch: ",cljs.core.list(new cljs.core.Keyword(null,"column","column",3954034376),new cljs.core.Symbol(null,"env","env",-1640430938,null)),"}"))),cljs.core.list(new cljs.core.Symbol(null,"str","str",-1640417302,null),"Typed Clojure: ",cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"res","res",-1640418727,null))," errors found.")),"Typed Clojure: no errors found.")))].join('');
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"typedclojure.check.ns","typedclojure.check.ns",2147291153),new cljs.core.Keyword(null,"desc","desc",1016984067),"Typed Clojure: check namespace",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.plugins.typedclojure.raise_STAR_.call(null,lt.objs.editor.pool.last_active.call(null),lt.plugins.typedclojure.ns_checker,new cljs.core.Keyword(null,"res","res",1014017042),new cljs.core.Keyword(null,"statusbar","statusbar",3238675027));
})], null));
lt.plugins.typedclojure.check_form = (function check_form(s){return [cljs.core.str("\n   (if-let [res (seq (:delayed-errors (clojure.core.typed/check-form-info '"),cljs.core.str(s),cljs.core.str(")))]\n     (for [^Exception e res]\n       (let [{:keys [env] :as data} (ex-data e)]\n         (list (first (clojure.string/split (.getMessage e) #\"\nHint\")) \"\n\"\n               (if (contains? data :form)\n                 (str (:form data))\n                 0) \"\n\")))\n     (with-out-str (clojure.pprint/write (clojure.core.typed/cf "),cljs.core.str(s),cljs.core.str("))))")].join('');
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"typedclojure.check.form","typedclojure.check.form",3571761296),new cljs.core.Keyword(null,"desc","desc",1016984067),"Typed Clojure: check var or form",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var e = lt.objs.editor.pool.last_active.call(null);var c = lt.objs.editor.__GT_cursor.call(null,e);var token = (cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,e))?new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"string","string",4416885635),lt.objs.editor.selection.call(null,e),new cljs.core.Keyword(null,"selection","selection",3592905982),true], null):lt.plugins.typedclojure.token.__GT_token.call(null,e,c));if(cljs.core.truth_((function (){var or__6813__auto__ = new cljs.core.Keyword(null,"boundary","boundary",3193559964).cljs$core$IFn$_invoke$arity$1(token);if(cljs.core.truth_(or__6813__auto__))
{return or__6813__auto__;
} else
{return new cljs.core.Keyword(null,"whitespace","whitespace",1290815983).cljs$core$IFn$_invoke$arity$1(token);
}
})()))
{var vec__8338 = lt.plugins.paredit.form_boundary.call(null,e,new cljs.core.Keyword(null,"at","at",1013907365).cljs$core$IFn$_invoke$arity$1(token),null);var start = cljs.core.nth.call(null,vec__8338,0,null);var end = cljs.core.nth.call(null,vec__8338,1,null);var form = lt.objs.editor.range.call(null,e,start,lt.objs.editor.adjust_loc.call(null,end,1));return lt.plugins.typedclojure.raise_STAR_.call(null,e,lt.plugins.typedclojure.check_form.call(null,form),new cljs.core.Keyword(null,"res","res",1014017042),new cljs.core.Keyword(null,"inline-at-cursor","inline-at-cursor",3025579886));
} else
{if(cljs.core.truth_(new cljs.core.Keyword(null,"orphan","orphan",4300461050).cljs$core$IFn$_invoke$arity$1(token)))
{return lt.objs.notifos.set_msg_BANG_.call(null,"core.typed can only check vars or forms");
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return lt.plugins.typedclojure.raise_STAR_.call(null,e,lt.plugins.typedclojure.check_form.call(null,new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(token)),new cljs.core.Keyword(null,"res","res",1014017042),new cljs.core.Keyword(null,"inline-at-cursor","inline-at-cursor",3025579886));
} else
{return null;
}
}
}
})], null));
}

//# sourceMappingURL=typed clojure_compiled.js.map