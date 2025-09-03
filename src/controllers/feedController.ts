import { NextFunction, Request, Response } from "express";
import db from "../data/db";
import Parser from "rss-parser";
import { Feed } from "../models/feed.model";

export const getFeeds = (req: Request, res: Response, next: NextFunction) => {
    db.serialize(() => {
        db.all(`SELECT * FROM feeds`, (err, rows) => {
            res.status(200).json(rows);
        });
    });
}

export const addFeed = (req: Request, res: Response, next: NextFunction) => {
    const { name, url } = req.body;
    db.serialize(() => {
        db.run(`INSERT INTO feeds (name, url, created_at, updated_at) VALUES (?, ?, ?, ?)`, [name, url, new Date(), new Date()]);
    });
    res.status(201).json({ message: 'Feed added successfully' });
}

export const deleteFeed = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    db.serialize(() => {
        db.run(`DELETE FROM feeds WHERE id = ?`, [id]);
    });
    res.status(204).json({ message: 'Feed deleted successfully' });
}

export const updateFeed = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, url } = req.body;
    db.serialize(() => {
        db.run(`UPDATE feeds SET name = ?, url = ?, updated_at = ? WHERE id = ?`, [name, url, new Date(), id]);
    });
    res.status(200).json({ message: 'Feed updated successfully' });
}

export const getFeedById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    db.serialize(() => {
        db.get(`SELECT * FROM feeds WHERE id = ?`, [id], (err, row) => {
            res.status(200).json(row);
        });
    });
}

export const getPostsByFeedId = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    db.serialize(() => {
        db.get(`SELECT * FROM feeds WHERE id = ?`, [id], async (err, row: Feed) => {
            const parser = new Parser();
            const feed = await parser.parseURL(row.url);
            res.status(200).json(feed);
        });
    });
}
